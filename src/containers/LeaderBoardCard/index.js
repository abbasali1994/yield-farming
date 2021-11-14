import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TablePagination from '@material-ui/core/TablePagination';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CustomTable from '../../component/CustomTable';
import useStyles from './index.style';

const LeaderBoardCard = () => {
  const classes = useStyles();

  const [leadersData] = useState([
    { position: 1, ethAddress: '0xEE7gb2…241dg75F', poolShare: '80.00%' },
    { position: 1, ethAddress: '0xEE7gb2…241dg75F', poolShare: '80.00%' },
    { position: 1, ethAddress: '0xEE7gb2…241dg75F', poolShare: '80.00%' },
    { position: 1, ethAddress: '0xEE7gb2…241dg75F', poolShare: '80.00%' },
    { position: 1, ethAddress: 'You', poolShare: '80.00%' },
    { position: 1, ethAddress: '0xEE7gb2…241dg75F', poolShare: '80.00%' },
    { position: 1, ethAddress: '0xEE7gb2…241dg75F', poolShare: '80.00%' },
  ]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(4);

  const totalPages = () => {
    const total = Math.ceil(leadersData.length / rowsPerPage);
    if (total < 1) {
      return 1;
    }
    else {
      return total;
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onChangePageNumber = (event) => {
    let pageToJump = event.target.value - 1;
    if (pageToJump >= totalPages()) {
      pageToJump = totalPages() - 1;
    }
    else if (pageToJump < 0) {
      pageToJump = 0;
    }
    setPage(pageToJump);
  };

  // Table data => leadersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Card className={classes.cardHeight}>
      <CardContent>
        <Typography className={classes.cardTitle}>Leaderboard</Typography>
        <br/>
        <CustomTable data={leadersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} />
        <br/>
        <div className={classes.flexBox}>
          <div></div>
          <TablePagination
            className={classes.text}
            component="div"
            rowsPerPageOptions={[]}
            count={leadersData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            labelDisplayedRows={({ page }) => `Page ${page + 1} of ` + totalPages()}
          />
          <FormControl variant="outlined" className={classes.formControlStyle}>
            <Typography>Jump to page: </Typography>
            <OutlinedInput
              type="number"
              onChange={onChangePageNumber}
              inputProps={{
                className: classes.textInput,
              }}
              className={classes.textBox}             
            />
          </FormControl>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderBoardCard;