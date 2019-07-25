import React, { Component } from 'react';
import { appStyles, colors } from '../../theme'
import localizations from "../Localizations";

let styles ;

class OrganizerSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
        listIsOpen: false
    }
  }

  componentDidMount() {
    window.addEventListener('click', this._handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this._handleClickOutside);
  }

  _toggleDropdown = () => {
      if (!this.props.isDisabled)
        this.setState({
            listIsOpen: !this.state.listIsOpen
        })
  }

  _handleClickOutside = event => {
    if (!this._containerNode.contains(event.target)) {
      this.setState({ listIsOpen: false });
    }
  }

	assistantTypeName = (item) => {
    return (
      <p style={{fontStyle: 'italic'}}>
        {item.secondaryOrganizerType ? item.secondaryOrganizerType.name[localizations.getLanguage().toUpperCase()] : item.customSecondaryOrganizerType}
      </p>
    )
  }
  
  render() {
    let { isDisabled, list, onSelectItem, selectedItem, placeholder, label } = this.props ;
    let { listIsOpen } = this.state

    const inputStyle = isDisabled ? appStyles.inputDisabled : {...appStyles.input, ...styles.input} ;
    const triangleStyle = isDisabled ? styles.triangleDisabled : listIsOpen ? styles.triangleOpen : styles.triangle ;
    if (label) triangleStyle.top = 22 ;

    return(
      <div style={styles.container} onClick={this._toggleDropdown} ref={node => { this._containerNode = node; }}>
        {label && <div style={appStyles.inputLabel}>{label}</div>}
        <input
            style={inputStyle}
            type='text'
            value={selectedItem ? selectedItem.organizer.pseudo : ''}
            readOnly={true}
            placeholder={placeholder}
            width='100%'/>
        <span style={triangleStyle} onClick={this._toggleDropdown} />  
        {
          listIsOpen && 
            <div style={label ? styles.dropdownWithLabel : styles.dropdown}>
                <ul style={styles.list}>
                {
                    list.map((item, index) =>
                        <li
                            key={index}
                            style={styles.listItem}
                            onClick={() => onSelectItem(item)}                        
                        >
	                        <div style={{ ...styles.avatar, backgroundImage: `url(${item.organizer.avatar})` }} />
                          {item.organizer.pseudo + ' ('}
                          {this.assistantTypeName(item)}
                          {')'}
                        </li>
                    )
                }
                </ul>
            </div>
        }
      </div>
    )
  }
}

styles = {
	avatar: {
		width: 39,
		height: 39,
		marginRight: 10,
		color: colors.blue,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		borderRadius: '50%',
	},
    container: {
        position: 'relative',
        cursor: 'pointer'
    },
    input: {
        cursor: 'pointer',
    },
    triangle: {
        position: 'absolute',
        right: 0,
        top: 12,
        width: 0, 
        height: 0,

        transition: 'border 100ms',
        transitionOrigin: 'left',

        cursor: 'pointer',
        
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderTop: `8px solid ${colors.blue}`,
    },
    triangleOpen: {
        position: 'absolute',
        right: 0,
        top: 12,
        width: 0, 
        height: 0,

        transition: 'border 100ms',
        transitionOrigin: 'left',

        cursor: 'pointer',
        
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderBottom: `8px solid ${colors.green}`,
    },
    triangleDisabled: {
        position: 'absolute',
        right: 0,
        top: 12,
        width: 0, 
        height: 0,
        cursor: 'default',

        transition: 'border 100ms',
        transitionOrigin: 'left',
        
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderTop: `8px solid ${colors.gray}`,
    },
    dropdown: {
        position: 'absolute',
        top: 30,
        left: 0,
    
        width: '100%',
        maxHeight: 300,
    
        backgroundColor: colors.white,
    
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.24), 0 0 4px 0 rgba(0,0,0,0.12)',
        border: '2px solid rgba(94,159,223,0.83)',
        padding: '10px 15px',
    
        overflowY: 'scroll',
        overflowX: 'hidden',
    
        zIndex: 100,
    },
    dropdownWithLabel: {
        position: 'absolute',
        top: 45,
        left: 0,
    
        width: '100%',
        maxHeight: 300,
    
        backgroundColor: colors.white,
    
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.24), 0 0 4px 0 rgba(0,0,0,0.12)',
        border: '2px solid rgba(94,159,223,0.83)',
        padding: '10px 15px',
    
        overflowY: 'scroll',
        overflowX: 'hidden',
    
        zIndex: 100,
    },
    list: {},
    listItem: {
	      display: 'flex',
        paddingTop: 5,
        paddingBottom: 5,
        color: '#515151',
        fontSize: 16,
        fontWeight: 500,
        fontFamily: 'Lato',
        borderBottomWidth: 1,
        borderColor: colors.blue,
        borderStyle: 'solid',
        cursor: 'pointer',
    },
    listItemSelected: {
	      display: 'flex',
        paddingTop: 5,
        paddingBottom: 5,
        color: '#515151',
        fontSize: 16,
        fontFamily: 'Lato',
        borderBottomWidth: 1,
        borderColor: colors.blue,
        borderStyle: 'solid',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
}

export default OrganizerSelect ;