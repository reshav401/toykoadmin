import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { 
  Button, 
  Grid, 
  TextField, 
  CircularProgress, 
  Card, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography 
} from '@mui/material';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { getRegionItem, updateRegion } from 'src/slices/region';

import Loader from 'src/components/Loader'

function UpdateRegionForm() {
  const router = useRouter();

  const { regionId } = router.query;

  const [region, setRegion] = useState({})
  const [isRegion, setIsRegion] = useState(false);

  useEffect(async () => {
    const resRegion = await getRegionItem(regionId);

    setRegion(resRegion);
    setIsRegion(resRegion)
  }, [])

  const onUpdateRegion = async (values, setErrors, setSubmitting) => {
    try {
      await updateRegion(regionId, values);
      router.push('/regions')
    } catch (error) {
      setErrors(error);
    }
  }

  const initialsValues = {
    Name: region.Name,
    submit: null
  };

  const validationSchema = Yup.object().shape({
    Name: Yup.string()
      .max(255)
      .required('The name field is required'),
  });

  if(!isRegion) {
    return (
      <div>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <Card
        sx={{
          padding: 4,
          mx: 4,
        }}
      >
        <Formik
          initialValues={initialsValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
            await inUpdateRegion(values, setErrors, setSubmitting)
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
                    name="name"
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
                  Update Brand
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </>
  )
}

export default UpdateRegionForm
