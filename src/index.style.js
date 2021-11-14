import { makeStyles } from '@material-ui/core';
import backgroungImg from './assets/HeaderBanner_2.png'

const useStyles = makeStyles(theme => ({
  typography: {
    fontSize: 18,
    width: 'fit-content',
    padding: theme.spacing(1),
    marginTop: theme.spacing(0.5)
  },
  heading: {
    fontSize: '32px',
    textTransform: 'uppercase',
    color: 'white',
  },
  subHeading: {
    fontSize: '18px',
    color: '#D6D6D9',
  },
  flexDiv: {
    display: 'flex',
  },
  addressBox: {
    width: '228px',
    float: 'right',
    textAlign: 'center',
    color: '#5643CC',
  },
  addressText: {
    padding: '5px 0',
  },
  inlineElement: {
    display: 'inline',
    marginRight: '30px',
    fontSize: '16px',
    color: '#B8B8BA',
    cursor: 'pointer',
  },
  active: {
    color: '#5643CC',
    borderBottom: '2px solid #5643CC',
    fontSize: '16px',
  },
  flexBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '12px',
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
  divImage: {
    backgroundImage: `url(${backgroungImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "center top",
    backgroundSize: "100% 100%",
  },
  cardHeight: {
    height: '420px',
  },
  containerStyle: {
    marginTop: '70px',
    paddingTop: '35px',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  gridStyle: {
    textAlign: "center"
  },
  typographyBackdrop: {
    fontSize: 18,
    padding: theme.spacing(1),
    marginTop: theme.spacing(0.5)
  },
  typographyBackdropLoading: {
    fontSize: 18,
    padding: theme.spacing(1),
    marginTop: theme.spacing(0.5),
    textAlign: 'center'
  },
 '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiTypography-root': {
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },  
    '.MuiCardContent-root': {
      padding:'22px 30px',
    },
    '.Mui-disabled': {
      boxShadow:'none',
    }       
  },
}));

export default useStyles;