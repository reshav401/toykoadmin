import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { 
  Button, 
  Grid, 
  TextField, 
  CircularProgress, 
  Card, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormControl, 
  Typography 
} from '@mui/material';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { createRegion } from 'src/slices/region';

const initialsValues = {
  Name: '',
  submit: null
}

function CreateRegionForm() {

  const router = useRouter();

  const onAddRegion = async (values, { setErrors }) => {
    try {
      await createRegion(values);
      router.push('/regions')
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
            await onAddRegion(values, setErrors)
          }}
          >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
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
                  Add Region
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </>
  )
}

export default CreateRegionForm;
