import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: '#7C7C7D',
    borderBottom: '2px solid #B8B8BA',
    fontSize: '16px',
    fontWeight: 500,
    paddingBottom: '10px',
  },
  body: {
    fontSize: 14,
    padding: '7px 17px',
    color: '#7C7C7D',
  },
}))(TableCell);

export default StyledTableCell;