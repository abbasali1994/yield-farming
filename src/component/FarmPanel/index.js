import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './index.style';
import CssTextField from './CssTextField';

const FarmPanel = (props) => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.textStyle}>Amount to farm (USDT)</Typography>
      <CssTextField
        color="primary"
        variant="outlined"
        placeholder="Enter Amount..."
        fullWidth
        type="number"
        value={props.value}
        onChange={props.onStakeInputChange}
        InputProps={{
          endAdornment: (
            <Button
              color="primary"
              variant="outlined"
              className={classes.maxButton}
              onClick={props.setMaxStakeInput}
            >Max</Button>
          ),
          className: classes.input,
        }}
      />
      <Typography className={classes.errorText}>{props.errorText}</Typography>
      <div className={classes.stakeButtonDiv}>
        <Button
          color="primary"
          variant="contained"
          className={classes.stakeButton}
          onClick={props.stake}
        >Farm</Button>
      </div>
      <br /><br />
      <div>
        <Typography style={{ textAlign: 'center' }} className={classes.textStyle}>Please use this option to provide liquidity using USDT only</Typography>
      </div>
    </>
  );
};

export default FarmPanel;