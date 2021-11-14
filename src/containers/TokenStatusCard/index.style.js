import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  flexDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
    flex:'33%',
    marginLeft:150,
    borderBottom:'1px solid rgba(0, 0, 0, 0.12);',
  },
  balanceContainer: {
    display: 'flex',
    "& div:first-child": {
      marginLeft:0,
    }    
  },
  simpleFlex: {
    display: 'flex',
  },
  tip: {
    display: 'inline',
    paddingLeft: 'inherit',
    color: '#2FD593',
    fontSize: '14px',
    // Set margin left as (value - (value*0.1))%
  },
  cardTitle: {
    color: '#5C5C61',
    fontSize: '18px',
    fontWeight: 500,
    marginBottom:'8px',
  },
  cardContentLight: {
    color: '#7C7C7D',
  },
  cardContentDark: {
    color: '#1C2128',
  },  
  greenText: {
    color: '#2FD593',
    fontSize: '16px',
  },
  cardHeight: {
    height: 112,
    boxShadow: '0px 3px 6px #000000',
  },
  poolDiv: {
    height: '115px',
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
  },
}));

export default useStyles;