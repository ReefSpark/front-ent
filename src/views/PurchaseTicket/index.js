/* eslint-disable */
import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Grid, makeStyles, Button } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import Page from 'src/components/Page';
import axios from 'axios';

import TicketDetailsForm from './TicketDetailsForm';
import DynamicForm from './DynamicForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();
  const token = localStorage.getItem('token');

  const [ticketConfirm, setTicketConfirm] = useState(false);
  const [ticketNumberConfirm, setTicketNumberConfirm] = useState(false);

  const [ticketDetails, setTicketDetails] = useState({
    user: '',
    newuser: '',
    ticket: '',
    sellingprice: ''
  });

  const [ticketNumbers, setTicketNumbers] = useState({
    tickets: [{ id: uuidv4(), ticketNumber: '' }]
  });

  const handleSubmit = async () => {
    let data = {
      ticketprice: ticketDetails.ticket,
      sellingprice: ticketDetails.sellingprice,
      ticketnumbers: []
    };

    if (ticketDetails.newuser) {
      data['newuser'] = ticketDetails.newuser;
    } else {
      data['user'] = ticketDetails.user;
    }

    ticketNumbers.tickets.map((ticket) => {
      data.ticketnumbers.push(ticket.ticketNumber);
    });

    await axios
      .post(`${process.env.REACT_APP_API}/purchaseticket`, data, {
        headers: { 'Bearer-Token': token }
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <Page className={classes.root} title="Purchase Ticket">
      {token ? (
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <TicketDetailsForm
                value={ticketDetails}
                setValue={setTicketDetails}
                setConfirm={setTicketConfirm}
              />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <DynamicForm
                value={ticketNumbers}
                setValue={setTicketNumbers}
                verification={ticketConfirm}
                setConfirm={setTicketNumberConfirm}
              />
              {ticketConfirm && ticketNumberConfirm && (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit}
                  style={{ margin: '10px' }}
                >
                  Submit
                </Button>
              )}
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Navigate to="/login" />
      )}
    </Page>
  );
};

export default SettingsView;
