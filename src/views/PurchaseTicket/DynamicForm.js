import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, FieldArray, getIn } from 'formik';
import { TextField, Button, IconButton, Card } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  tickets: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required('Unique key is a must'),
      ticketNumber: Yup.string()
        .min(1)
        .max(5)
    })
  )
});

const DynamicForm = ({ value, setValue, setConfirm, verification }) => {
  return (
    <div>
      <Formik
        initialValues={value}
        onSubmit={(values) => {
          setValue(values);
          setConfirm(true);
        }}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, errors }) => (
          <Form>
            <Card
              style={{
                maxHeight: '625px',
                overflowY: 'scroll',
                padding: '10px'
              }}
            >
              <FieldArray name="tickets">
                {({ push, remove }) => (
                  <div
                    onKeyPress={(target) => {
                      if (target.charCode === 13) {
                        push({ id: uuidv4(), ticketNumber: '' });
                      }
                    }}
                  >
                    {values.tickets.map((ticket, index) => {
                      const name = `tickets[${index}].ticketNumber`;
                      const errorMessage = getIn(errors, name)
                        ? 'Ticket number must be a max of 5'
                        : '';
                      return (
                        <div
                          key={ticket.id}
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <TextField
                            style={{ marginLeft: '25%' }}
                            label="Ticket Number"
                            name={name}
                            value={ticket.ticketNumber}
                            onChange={handleChange}
                            helperText={errorMessage}
                            error={Boolean(errorMessage)}
                            variant="outlined"
                            margin="normal"
                            autoFocus
                          />
                          <IconButton onClick={() => remove(index)}>
                            <Delete />
                          </IconButton>
                        </div>
                      );
                    })}
                  </div>
                )}
              </FieldArray>
            </Card>
            <div>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={!verification}
                style={{ float: 'right', marginTop: '10px' }}
              >
                Confirm
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

DynamicForm.propTypes = {
  value: PropTypes.object,
  verification: PropTypes.bool,
  setValue: PropTypes.func,
  setConfirm: PropTypes.func
};

export default DynamicForm;
