import React, { Component } from 'react'
import {createFragmentContainer, graphql} from 'react-relay'
import { request } from 'graphql-request'


import { blogUrlGraphql } from '../../../constants.json'

import { Link } from 'found'

import Header from '../common/Header/Header'
import Footer from '../common/Footer/Footer'
import Loading from '../common/Loading/Loading'
import localizations from '../Localizations'
import {
  Page,
  Hero,
  Title,
  BreadCrumbs,
  SubTitle,
  Content,
  Article,
} from '../common/Tutorial/content'
import { metrics, colors, fonts } from '../../theme'

import Radium from 'radium'
import isEqual from 'lodash/isEqual'

let links = {}

const TutorialTabs = Radium(({ data, index, setIndex }) =>
  <ul style={styles.tabs}>
    {data.map((item, itemIndex) =>
      <li
        key={`tut-tab-${itemIndex}`}
        style={index === itemIndex? styles.tabSelected : styles.tab}
        onClick={() => setIndex(itemIndex)}
      >
        {item.label()}
      </li>
    )}
  </ul>
)

TutorialTabs.defaultProps = {
  index: 0,
}

const SumaryRender = ({ section, goTutorialLink }) =>
<div style={styles.sumaryContainer}>
  {section.content.map((content, contentIndex) =>
    <ul
      style={styles.sumaryList}
      key={`tut-sum-${contentIndex}`}
    >
      <li style={styles.sumaryListTitle}>{content.label()}</li>
      {content.items.map((item, itemIndex) =>
        <li
          key={`tut-sum-item-${itemIndex}`}
          style={styles.sumaryListContent}
          onClick={() => goTutorialLink(item.link())}
        >
          {item.label()}
        </li>
      )}
    </ul>
  )}
</div>
export const Sumary = Radium(SumaryRender)

const s2c = (str) => str.substr(0, 2)

const translantions = (t, interest) =>
  t.edges.find(
    ({ node: { language }}) => s2c(language) === s2c(interest)
  ) ||
  t.edges[0]

const workAroundGroupTranslat$1 = {
  EN: 0,
  FR: 1,
}

const workAroundGroupT = (t, interest) =>
  t.edges[workAroundGroupTranslat$1[s2c(interest)]] ||
  t.edges[0]

const postRender = (content) => <div dangerouslySetInnerHTML={{
  __html: content,
}} />

const urlForwardOfItem = (post) =>
  post && post.node && post.node.translations.edges.reduce((mem, t) => mem || t.node.urlForward, '')

const sortPosts = (posts) =>
  posts.sort((a,b) => (a.node.order || 99) > (b.node.order || 99))

const getItems = (items, isMobileVersion) => sortPosts(items).map((post, postIndex) => {
  const t = () => translantions(
    post.node.translations,
    localizations.getLanguage().toUpperCase(),
  )

  return {
    id: post.node.id,
    label: () => t().node.title,
    title: () => t().node.titleFull,
    link: () => urlForwardOfItem(post) || (isMobileVersion ? '/faq-mobile/tutorial/' : '/faq/tutorial/')+t().node.friendlyurl,
    allLinks: post.node.translations.edges.map(
      ({ node: { friendlyurl } }) => friendlyurl
    ),
    render: postRender,
  }
})


const transformData = (rdata, isMobileVersion) => rdata.edges.map(
  ({
    node: {
      translations,
      groups: {
        edges: groups
      }
    }
  }) => {
    const content = groups.map((group, groupIndex) => {

      const tg = () => workAroundGroupT(
        group.node.translations,
        localizations.getLanguage().toUpperCase(),
      )

      return {
        label: () => tg().node.title,
        title: () => tg().node.titleFull,
        items: getItems(group.node.posts.edges, isMobileVersion)
      }
    })

    const t = () => translantions(
      translations,
      localizations.getLanguage().toUpperCase(),
    )

    const section = {
      label: () => t().node.title,
      content,
    }

    return section

})

const allSections = `
allSections {
  edges {
    node {
      id
      translations {
        edges {
          node {
            language
            title
          }
        }
      }
      groups(orderBy: createdAt_ASC) {
        edges {
          node {
            id
            translations {
              edges {
                node {
                  title
                  titleFull
                }
              }
            }

            posts(orderBy: order_ASC) {
              edges {
                node {
                  id
                  date
                  translations {
                    edges {
                      node {
                        language
                        title
                        friendlyurl
                        urlForward
                      }
                    }
                  }
                }
              }
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
            }
          }

        }
      }


    }
  }
  pageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
}
`

const TutorialQuery = `{
  viewer {
    ${allSections}
  }
}
`

const TutorialPostQuery = (postId) => `{
  viewer {
    Post(id: "${postId}") {
      id
      date
      translations {
        edges {
          node {
            language
            title
            titleFull
            content
          }
        }
      }
    }
  }
}
`

class Tutorial extends Component {
  state = {
    language: localizations.getLanguage(),
    tabIndex: 0,
    isLoading: true,
    sections: [],
    isMobileVersion: false
  }

  componentDidMount() {

    request(blogUrlGraphql, TutorialQuery)
      .then(data => {
        const sections = transformData(data.viewer.allSections, this.props.location.pathname.indexOf('faq-mobile') >= 0)
        this.setState({
          isLoading: false,
          sections,
        })

        updateLinks(sections)
      })
      .catch(e => {
        console.log(e)
        this.setState({
          isLoading: false,
          error: true,
          errorElement: e,
        })
      })

    if (this.props.location.pathname.indexOf('faq-mobile') >= 0) {
      this.setState({isMobileVersion: true})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !isEqual(this.props, nextProps) ||
      !isEqual(this.state, nextState)
    )
  }

  _setLanguage = (language) => {
    this.setState({ language })
  }

  _goTutorialLink = (url) => {
    this.props.router.push({pathname: url});
  }

  _setIndex = (tabIndex) => this.setState({ tabIndex })

  render() {
    const { viewer } = this.props

    return this.state.isLoading?
      <Loading type='spinningBubbles' color='#e3e3e3' /> : (
        <div style={styles.container}>
          <Hero content={localizations.tutorial_title}/>
          <Content>
            <TutorialTabs
              data={this.state.sections}
              index={this.state.tabIndex}
              setIndex={this._setIndex}
            />
            <Sumary
              section={this.state.sections[this.state.tabIndex]}
              goTutorialLink={this._goTutorialLink}
            />
          </Content>
        </div>
      )
  }
}



const commonStyles = {
  tab: {
    color: 'gray',
    fontSize: 13,
    fontWeight: fonts.weight.xxl,
    paddingTop: metrics.margin.small,
    paddingBottom: metrics.margin.small,
    paddingLeft: metrics.margin.large,
    paddingRight: metrics.margin.large,
    textTransform: 'uppercase',
  }
}

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Lato',
  },
  tabSelected: {
    ...commonStyles.tab,

    color: colors.darkBlue,
    borderBottom: `4px solid ${colors.darkBlue}`,
    marginBottom: '-2px',
  },
  tab: {
    ...commonStyles.tab,

    cursor: 'pointer',
    '@media (max-width: 550px)': {
      borderBottom: `1px solid ${colors.blue}`,
    },
    ':hover': {
      color: colors.blue,
    }
  },
  tabs: {
    marginTop: 30,
    width: '100%',
    display: 'flex',
    borderBottom: `2px solid ${colors.lightGray}`,
    '@media (max-width: 550px)': {
      flexDirection: 'column',
      borderBottom: `none`,
    }
  },
  sumaryContainer: {
    flex: 1, 
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  sumaryList: {
    width: '29%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    margin: '20px 2%',
    border: `1px solid ${colors.lightGray}`,
    fontSize: fonts.size.small,
    '@media (max-width: 650px)': {
      width: '44%',
      margin: '20px 3%'
    },
    '@media (max-width: 450px)': {
      width: '90%',
      margin: '20px 5%'
    }
  },
  sumaryListTitle: {
    fontWeight: 600,
    fontSize: fonts.size.small,
    marginTop: 20,
    paddingLeft: 20,
    paddingright: 20,
    paddingBottom: 18,
    textTransform: 'uppercase',
  },
  sumaryListContent: {
    color: colors.darkBlue,
    fontSize: 14,
    marginBottom: 10,
    cursor: 'pointer',
    lineHeight: 1.6,
  },
  seeAlsoLink: {
    fontSize: 12,
    textDecoration: 'none',
    color: colors.darkBlue,
  },
}

export default createFragmentContainer(Radium(Tutorial), {
  viewer: graphql`
    fragment Tutorial_viewer on Viewer {
      id
      me {
        id
        pseudo
      }
    }
  `,
});

const getContent = (link) =>
  links[link]

const updateLinks = (sections) => {

  links = sections.reduce((mem, section) => ({
    ...mem,
    ...(section.content.reduce((secMem, content) => ({
      ...secMem,
      ...(content.items.reduce((itemMem, item, itemIndex) => ({
        ...itemMem,
        ...(item.allLinks.reduce(
          (linkMem, link) => ({
            ...linkMem,
            [link]: { section, content, item, itemIndex }
          })
        , {})),
      }), {}))
    }), {}))
  }), {})
}
