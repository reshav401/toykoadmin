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

import { createUnit } from 'src/slices/unit';

const initialsValues = {
  Name: '',
  submit: null
}

function CreateUnitForm() {

  const router = useRouter();

  // Adding division functionality
  const onAddUnits = async (values, { setErrors }) => {
    try {
      // creating the division and navigating to the list afterwards
      await createUnit(values)
      router.push('/catalog/units')
    } catch (err) {
      console.error(err);
      // setStatus({ success: false });
      setErrors({ submit: err.message });
      // setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    Name: Yup.string()
      .max(255)
      .required('The name field is required'),
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
          onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
            await onAddUnits(values, setErrors)
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
                  Add Unit
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </>
  )
}

export default CreateUnitForm
