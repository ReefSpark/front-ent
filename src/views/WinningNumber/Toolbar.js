import React, { useState, useContext } from 'react';
import _, { drop } from 'lodash';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  Box
} from '@material-ui/core';
import Axios from 'axios';
import moment from 'moment';

import { TicketContext } from 'src/contextApi/TicketContext';

import Snackbar from '../../components/NotifyBar';
import Input from '../../components/Input';
import WinningNumberCard from './winningNumberCard';

const useStyles = makeStyles(() => ({
  root: {}
}));

const WinningNumber = ({ className, ...rest }) => {
  const classes = useStyles();

  const [ticketList] = useContext(TicketContext);
  const [snackBarState, setSnackBarState] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [date, setDate] = useState(moment().format('YYYY/MM/DD'));
  const [ticketWinningNumbers, setTicketWinningNumbers] = useState({});

  const token = localStorage.getItem('token');

  let dropDownData = _.map(ticketList, 'price');
  dropDownData = _.uniq(dropDownData);

  const handleSubmit = () => {
    Axios.post(
      `${process.env.REACT_APP_API}/winningnumber`,

      {
        date: date,
        ticketWinningNumbers: ticketWinningNumbers
      },
      { headers: { 'Bearer-Token': token } }
    )
      .then(() => {
        setSnackBarState(true);
        setSeverity('success');
        setSnackBarMessage('Winning numbers added successfully');
      })
      .catch((error) => {
        const { response } = error;
        console.log(response);
        if (response.data.message === 'SequelizeUniqueConstraintError') {
          setSnackBarMessage('Winning numbers for today already added.');
          setSeverity('error');
          setSnackBarState(true);
        }
      });

    setTicketWinningNumbers({});
    setDate('');
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Snackbar
        snackBarState={snackBarState}
        setState={setSnackBarState}
        message={snackBarMessage}
        severity={severity}
      />
      <Card>
        <CardHeader title="Winning Number" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Input
                label="Date"
                setState={setDate}
                disabled
                type="text"
                value={date}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
      <br />
      <Card style={{ width: '50%', marginLeft: '20%' }}>
        <CardHeader title="Available Tickets" />
        <Divider />
        <CardContent>
          {dropDownData.map((ticket, index) => {
            return (
              <WinningNumberCard
                key={index}
                setState={setTicketWinningNumbers}
                value={ticketWinningNumbers}
                ticketName={ticket}
                index={index}
              />
            );
          })}
        </CardContent>
        <Divider />
      </Card>
      <Box display="flex" p={3} style={{ marginLeft: '40%' }}>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          margin={5}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

WinningNumber.propTypes = {
  className: PropTypes.string
};

export default WinningNumber;
