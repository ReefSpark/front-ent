import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {
  Container,
  TextField,
  Grid,
  Button,
  Box,
  Card,
  MenuItem,
  Typography
} from '@material-ui/core';
import { TicketContext } from 'src/contextApi/TicketContext';
import { UserContext } from 'src/contextApi/UserContext';
import DataTable from '../../components/DataTable';

const TicketDetailsForm = ({ value, setValue, setConfirm }) => {
  const token = localStorage.getItem('token');

  const [ticketList] = useContext(TicketContext);
  const [userList] = useContext(UserContext);

  const tableColumn = [
    { id: 'ticketPrice', label: 'Ticket Price', minWidth: 100 },
    { id: 'ticketNumber', label: 'Ticket Number', minWidth: 170 },
    {
      id: 'count',
      label: 'Count',
      minWidth: 170,
      align: 'center'
    }
  ];
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/purchaseticket/ticketchancecount`, {
        headers: { 'Bearer-Token': token }
      })
      .then((response) => {
        const obj = response.data;
        setTableData(obj.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <Container maxWidth="md">
      <Formik
        initialValues={value}
        validationSchema={Yup.object().shape({
          newuser: Yup.string().max(255),
          user: Yup.string().max(255),
          ticket: Yup.string().required(),
          sellingprice: Yup.string().required()
        })}
        onSubmit={(values, onSubmitProps) => {
          setValue(values);
          setConfirm(true);

          onSubmitProps.setSubmitting(false);
          onSubmitProps.resetForm();
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values
        }) => (
          <Card style={{ marginBottom: '5%' }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} style={{ padding: '10px' }}>
                <Grid item>
                  <TextField
                    style={{ width: '150px' }}
                    error={Boolean(touched.user && errors.user)}
                    helperText={touched.user && errors.user}
                    label="User"
                    name="user"
                    margin="normal"
                    onBlur={handleBlur}
                    value={values.user}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    select
                  >
                    {userList.map((user) => (
                      <MenuItem key={uuidv4()} value={user.customerName}>
                        {user.customerName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item>
                  <Typography
                    color="textSecondary"
                    variant="h4"
                    style={{
                      marginTop: '30px',
                      paddingRight: '10px',
                      paddingLeft: '10px'
                    }}
                  >
                    (or)
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    error={Boolean(touched.newuser && errors.newuser)}
                    fullWidth
                    helperText={touched.newuser && errors.newuser}
                    label="New User"
                    margin="normal"
                    name="newuser"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.newuser}
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    style={{ width: '150px' }}
                    error={Boolean(touched.ticket && errors.ticket)}
                    helperText={touched.ticket && errors.ticket}
                    label="Ticket"
                    name="ticket"
                    margin="normal"
                    onBlur={handleBlur}
                    value={values.ticket}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    select
                  >
                    {ticketList.map((ticket) => (
                      <MenuItem key={uuidv4()} value={ticket.price}>
                        {`${ticket.ticketName}-${ticket.price}`}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    error={Boolean(touched.sellingprice && errors.sellingprice)}
                    fullWidth
                    helperText={touched.sellingprice && errors.sellingprice}
                    label="Selling Price"
                    margin="normal"
                    name="sellingprice"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.sellingprice}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Box my={2}>
                <Button
                  style={{
                    float: 'right',
                    marginBottom: '10px',
                    marginRight: '10px'
                  }}
                  color="primary"
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Confirm
                </Button>
              </Box>
            </form>
          </Card>
        )}
      </Formik>

      <DataTable columns={tableColumn} rows={tableData} />
    </Container>
  );
};

TicketDetailsForm.propTypes = {
  value: PropTypes.object,
  setValue: PropTypes.func,
  setConfirm: PropTypes.func
};

export default TicketDetailsForm;
