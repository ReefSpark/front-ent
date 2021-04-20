import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import Input from '../../components/Input';

const WinningNumberCard = ({ value, setState, ticketName }) => {
  return (
    <Grid container spacing={3}>
      <Grid item md={6} xs={12}>
        <Typography variant="h4" style={{ marginTop: '3%' }}>
          {ticketName}
        </Typography>
      </Grid>
      <Grid item md={6} xs={12}>
        <Input
          label="Winning Number"
          value={value}
          setState={setState}
          variant="outlined"
          name={ticketName}
          fullWidth
          required
          dynamic
        />
      </Grid>
    </Grid>
  );
};

WinningNumberCard.propTypes = {
  value: PropTypes.object,
  setState: PropTypes.any,
  ticketName: PropTypes.string
};

export default WinningNumberCard;
