import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardHeight: {
    height: '366px',
    boxShadow: '0px 3px 6px #000000',
    position: 'relative',
  },
  flexBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '12px',
  },
  stakeBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  bodyText: {
    color: '#7C7C7D',
    fontSize: '14px',
  },
  numberText: {
    color: '#1C2128',
    fontSize: '14px',
    fontWeight: 500,
  },
  buttonStyle: {
    margin: '15% auto 0% auto',
    padding: '10px 64px',
    fontSize: 18,
    fontWeight: 400,
    width: '80%',
    boxShadow: '0px 3px 6px #00000029',
  },
  unstakeButtonStyle: {
    margin: '5% auto 5% auto',
    padding: '10px 64px',
    fontSize: 18,
    fontWeight: 400,
    width: '80%',
    boxShadow: '0px 3px 6px #00000029',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    bottom: '70px',
    right: '0',
    padding: '0 30px',
  },
  cardTitle: {
    color: '#5C5C61',
    fontSize: '18px'
  },
  input: {
    height: 51,
    paddingRight: '0 !important',
    fontSize: 18,
    fontWeight: 300,
    '& input': {
      paddingRight: 12,
    }
  },
  errorText: {
    fontSize: '14px',
    color: 'red',
  },
  stakeButtonStyle: {
    marginTop: '30px',
    padding: '10px 64px',
    background: '#5643CA',
    color: 'white',
    fontSize: 18,
    fontWeight: 400,
    width: 184,
    boxShadow: '0px 3px 6px #00000029',
    margin: '30px auto',
  },
  textStyle: {
    color: '#7C7C7D',
    fontWeight: 300,
    marginTop: 75,
  },
  maxButton: {
    padding: '9px 24px',
    fontSize: 18,
    fontWeight: 400,
    border: '1px solid rgba(63, 81, 181, 1)',
  },
  panelFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tagText: {
    fontSize: '18px',
    color: '#2FD593',
  },
  flexDiv: {
    display: 'flex',
  },
  active: {
    color: '#5643CC !important',
    borderBottom: '2px solid #5643CC',
    fontSize: '16px',
  },
  inlineElement: {
    display: 'inline',
    marginRight: '30px',
    fontSize: '18px',
    fontWeight: 500,
    color: '#B8B8BA',
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
  },
  linkText: {
    color: '#7C7C7D',
    fontWeight: 300,
    textAlign: 'center',
  }
}));

export default useStyles;