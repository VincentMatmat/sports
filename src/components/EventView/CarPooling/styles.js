import { colors, fonts } from '../../../theme';

export const styles = {
  container: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    padding: '20px 0px 20px',
    marginBottom: 20,
    color: colors.title,
    borderBottom: `1px solid ${colors.lightGray}`,
  },
  text: {
    fontSize: fonts.size.small,
    fontFamily: 'Lato',
    marginBottom: 20,
  },
  msgContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  greenButton: {
    backgroundColor: colors.green,
    color: colors.white,
    width: 230,
    borderRadius: 100,
    borderStyle: 'none',
    boxShadow: '0 0 4px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.24)',
    fontSize: 22,
    cursor: 'pointer',
    padding: '13px 5px',
    position: 'relative',
    marginTop: 15,
    ':disabled': {
      cursor: 'not-allowed',
      backgroundColor: colors.gray,
    },
  },
  redButton: {
    backgroundColor: colors.redGoogle,
    color: colors.white,
    width: 230,
    borderRadius: 100,
    borderStyle: 'none',
    boxShadow: '0 0 4px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.24)',
    fontSize: 22,
    cursor: 'pointer',
    padding: '13px 5px',
    position: 'relative',
    marginTop: 15,
    ':disabled': {
      cursor: 'not-allowed',
      backgroundColor: colors.gray,
    },
  },

  informationContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  label: {
    fontSize: fonts.size.large,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    marginRight: 10,
  },
  labelDriver: {
    color: colors.blue,
    fontSize: fonts.size.xl,
  },
  driverContainer: {
    flex: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: 16,
    marginTop: 5,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    marginRight: 7,
    backgroundPosition: '50% 50%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  information: {
    fontSize: 16,
  },
  passengersContainer: {},
  passenger: {},

  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    color: 'rgba(0,0,0,0.65)',
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontFamily: 'Lato',
    fontSize: 24,
    fontWeight: fonts.weight.medium,
    color: colors.blue,
    marginBottom: 20,
    flex: '2 0 0',
  },
  modalClose: {
    justifyContent: 'flex-center',
    paddingTop: 10,
    color: colors.gray,
    cursor: 'pointer',
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: fonts.size.small,
    fontFamily: 'Lato',
    flex: 1,
    marginRight: 10,
  },
  inputContainer: {
    flex: 3,
    position: 'relative',
  },
  input: {
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottomWidth: 2,
    borderBottomColor: colors.blue,
    fontSize: 16,
    fontFamily: 'Lato',
    color: 'rgba(0, 0, 0, 0.64)',
    outline: 'none',
    width: 90,
  },
  carPoolingStat: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    marginRight: 40,
  },
  exclamationIcon: {
    color: colors.bloodOrange,
    marginBottom: 30,
    fontSize: '8em',
  },
  errorMsg: {
    fontSize: fonts.size.medium,
    fontFamily: 'Lato',
    marginBottom: 20,
  },
  geosuggest: {
    input: {
      width: '100%',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottomWidth: 2,
      borderBottomColor: colors.blue,
      paddingRight: 20,

      fontSize: 16,
      fontFamily: 'Lato',
      lineHeight: 1,
      color: 'rgba(0, 0, 0, 0.64)',

      outline: 'none',
      ':focus': {
        borderBottomColor: colors.green,
      },
    },

    suggests: {
      width: '80%',
      position: 'absolute',
      top: 23,
      backgroundColor: colors.white,

      boxShadow: '0 2px 4px 0 rgba(0,0,0,0.24), 0 0 4px 0 rgba(0,0,0,0.12)',
      border: '2px solid rgba(94,159,223,0.83)',
      padding: 10,
      zIndex: 100,
    },

    suggestItem: {
      paddingTop: 2,
      paddingBottom: 2,
      color: '#515151',
      fontSize: 14,
      fontWeight: 500,
      fontFamily: 'Lato',

      ':hover': {
        backgroundColor: '#e9e9e9',
      },
    },
  },
};

export const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    width: '100%',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'visible',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    width: '90%',
    maxWidth: '600px',
  },
};