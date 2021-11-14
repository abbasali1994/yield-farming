import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: '#D5F7E9',
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#2FD593',
  },
}))(LinearProgress);

export default BorderLinearProgress;