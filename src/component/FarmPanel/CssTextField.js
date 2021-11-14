import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#5643CC',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#5643CC',
    },
    '&.MuiOutlinedInput-adornedEnd': {
      paddingRight: '0 !important',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#5643CC',
      },
      '&:hover fieldset': {
        borderColor: '#5643CC',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#5643CC',
      },
    },
  },
})(TextField);

export default CssTextField;