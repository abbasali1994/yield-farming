import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    margin: '15% auto 0% auto',
    padding: '10px 64px',
    fontSize:18,
    fontWeight:400,
    width: '80%',  
    boxShadow: '0px 3px 6px #00000029',   
  },
  redeemButtonStyle: {
    margin: '5% auto 5% auto',
    padding: '10px 64px',
    fontSize:18,
    fontWeight:400,
    width: '80%',  
    boxShadow: '0px 3px 6px #00000029',   
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    margin: 'auto',
  },
}));

export default useStyles;