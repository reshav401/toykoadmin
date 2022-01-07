import React from 'react'
import { useRouter } from 'next/router'

import { 
  Button, 
  Grid, 
  TextField, 
  CircularProgress, 
  Card 
} from '@mui/material';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { createDivision } from 'src/slices/division';

const initialsValues = {
  Name: '',
  Abbreviation: '',
  submit: null
}

function CreateDivisionForm() {

  const router = useRouter();

  // Adding division functionality
  const onAddDivisions = async (values, { setErrors }) => {
    try {
      // creating the division and navigating to the list afterwards
      await createDivision(values)
      router.push('/catalog/divisions')
    } catch (err) {
      console.error(err);
      // setStatus({ success: false });
      // setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    Name: Yup.string()
      .max(255)
      .required('The name field is required'),
    Abbreviation: Yup.string()
      .max(255)
      .required('The abbreviation field is required')
  })

  return (
    <>
      <Card
        sx={{
          p:4,
          mx: 4
        }}
      >
        <Formik
          initialValues={initialsValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setErrors, setStatus }) => {
            await onAddDivisions(values, setErrors)
          }}
          >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid 
                container
                gap={3}
              >
                <Grid item xs={12}>
                  <TextField
                      error={Boolean(touched.Name && errors.Name)}
                      fullWidth
                      helperText={touched.Name && errors.Name}
                      label='Name'
                      name="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Name}
                      variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={Boolean(
                    touched.Abbreviation && errors.Abbreviation
                    )}
                    fullWidth
                    helperText={touched.Abbreviation && errors.Abbreviation}
                    label='Abbreviation'
                    name="Abbreviation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Abbreviation}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                direction="column"
                alignItems="center"
                pt={4}
              >
                <Button
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={Boolean(errors.submit) || isSubmitting}
                  variant="contained"
                >
                  Add Division
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </>
  )
}

export default CreateDivisionForm
