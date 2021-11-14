import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    height: 51,
    paddingRight: '0 !important',
    fontSize:18,
    fontWeight: 300,  
    '& input': {
      paddingRight:12,
    }
  },
  maxButton: {
    padding: '9px 24px',
    fontSize:18,
    fontWeight:400,
    border: '1px solid rgba(63, 81, 181, 1)',
  },
  textStyle: {
    color: '#7C7C7D',
    fontWeight:300,
    marginTop:75,
  },
  stakeButtonDiv: {
    textAlign: 'center'
  },
  stakeButton: {
    padding: '10px 64px',
    background: '#5643CA',
    color: 'white',
    fontSize:18,
    fontWeight:400,
    position:'absolute',
    left: 0,
    right: 0,
    margin: '17px auto',
    bottom: 70, 
  },
  errorText: {
    fontSize: 14,
    color: 'red',
  },
}));

export default useStyles;