import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  flexDiv: {
    display: 'flex',
  },
  valueContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
  },
  cardTitle: {
    color: '#5C5C61',
    fontSize: '18px',
    fontWeight: 500,
    marginBottom: '8px',
    '& .MuiIconButton-root': {
      padding: 0,
      margin: '-2px 0 0px 12px',
    }
  },
  cardSubTitle: {
    color: '#5C5C61',
    fontSize: '18px',
    fontWeight: 300,
  },
  cardContentLight: {
    color: '#7C7C7D',
  },
  cardContentDark: {
    color: '#1C2128',
  },
  gainText: {
    color: '#2FD593',
    fontSize: '16px',
  },
  cardHeight: {
    boxShadow: '0px 3px 6px #000000',
  },
  yieldText: {
    color: '#D6D6D9',
    fontSize: '12px',
  },
  netValueIncrease: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  netValueText: {
    fontFamily: 'Iceland, cursive',
    fontSize: '56px',
    color: '#2FD593',
  },
  greenText: {
    color: '#2FD593',
  },
  textStyle: {
    color: '#7C7C7D',
    fontWeight: 300,
    textAlign: 'end'
  },
  tip: {
    display: 'inline',
    paddingLeft: 'inherit',
    color: '#2FD593',
    fontSize: '14px',
    // Set margin left as (value - (value*0.1))%
  },
  cardContentText: {
    color: '#7C7C7D',
    marginBottom: '10px',
  },
}));

export default useStyles;