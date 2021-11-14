import { makeStyles } from '@material-ui/core';
import backgroungImg from '../../assets/HeaderBanner_2.png'

const useStyles = makeStyles(theme => ({
  grid: {
    width: "1080px",
    margin: "12vh auto 0 auto",
    position: "relative",
    justifyContent: "center"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  image: {
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    textAlign: "center",
    padding: "1px",
    backgroundImage: `url(${backgroungImg})`
  },
  typography: {
    fontSize: 18,
    width: 'fit-content',
    padding: theme.spacing(1),
    marginTop: theme.spacing(0.5)
  },
  button: {
    margin: theme.spacing(1),
    color: "#5643CC",
    border: "1px solid #5643CC",
    width: theme.spacing(15),
    "&:hover": {
      backgroundColor: "#5643CC",
      color: "#FFFFFF",
      border: "1px solid #5643CC",
    },
  },
  bottomCard: {
    margin: "8px",
    padding: "5px"
  },
  metamaskCard: {
    padding: "40px 0"
  },
  notLogin: {
    display: "block",
  },
  arrowImage: {
    position: "absolute",
    transform: "translate(30%, -10%)"
  },
  bottomText: {
    bottom: "0",
    width: "100%",
    textAlign: "center",
    color: "white",
    padding: "20px"
  }
}));

export default useStyles;