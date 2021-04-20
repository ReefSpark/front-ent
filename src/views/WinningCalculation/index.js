import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import TicketForm from './TicketForm';
import TicketPriceTable from './TicketPriceTable';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const ManageTicket = () => {
  const classes = useStyles();
  const token = localStorage.getItem('token');

  const [summaryData, setSummaryData] = useState('');

  return (
    <Page className={classes.root} title="Manage Ticket">
      {token ? (
        <>
          <Container
            maxWidth={false}
            style={{ marginLeft: '20%', width: '800px' }}
          >
            <Box mt={3}>
              <Grid container spacing={3}>
                <TicketForm setValue={setSummaryData} />
              </Grid>
            </Box>
          </Container>
          <Container
            maxWidth={false}
            style={{ marginLeft: '20%', width: '800px' }}
          >
            <Box mt={3}>
              <Grid container spacing={3}>
                <TicketPriceTable value={summaryData} />
              </Grid>
            </Box>
          </Container>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </Page>
  );
};

export default ManageTicket;
