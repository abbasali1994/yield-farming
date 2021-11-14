import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    color: '#5C5C61',
    fontSize: '16px',
    fontWeight: 500,
  },
  flexBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  text: {
    width: '175px',
    // margin: '10px auto 0',
    marginLeft: '100px',
    color:theme.text,
    '& button[title="Previous page"]': {
      position:'absolute',
      left:0,
      padding:0,
      color:'#3f51b5'
    },
    '& button.Mui-disabled': {
      opacity:0.3,
    },
    '& button[title="Next page"]': {
      padding:0,
      color:'#3f51b5'
    }, 
    '& .MuiTablePagination-caption': {
      fontWeight: 300,
      paddingLeft: '11px',
    }      
  },
  formControlStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBox: {
    width: '47px',
    height: '27px',
  },
  textInput: {
    padding: '18.5px 8px',
  },
  cardHeight: {
    height: '420px',
  },
}));

export default useStyles;