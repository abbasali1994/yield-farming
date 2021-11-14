import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpandLess from '@material-ui/icons/ExpandLess';
// import ExpandMore from '@material-ui/icons/ExpandMore';
import StyledTableCell from './StyledTableCell';
import useStyles from './index.style';

const CustomTable = (props) => {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Position</StyledTableCell>
            <StyledTableCell>ETH Address</StyledTableCell>
            <StyledTableCell>Pool Share %</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, index) => (
            <TableRow key={`${row['ethAddress']}_${index+1}`}>
              {Object.keys(row).map((tag, index) => (
                tag === 'poolShare'
                ? <StyledTableCell key={`${row[tag]}_${index+1}`}><span><ExpandLess htmlColor="#2FD593" className={classes.iconStyle} /></span>{row[tag]}</StyledTableCell>
                : <StyledTableCell key={`${row[tag]}_${index+1}`}>{row[tag]}</StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;