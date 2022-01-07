import React, { useState, useEffect } from 'react'
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

import { getDivisionItem, updateDivision } from 'src/slices/division';

import Loader from 'src/components/Loader'

function UpdateDivisionForm() {
  const router = useRouter();

  const { divisionId } = router.query;
  
  const [division, setDivision] = useState({});
  const [isDivision, setIsDivision] = useState(false);

  useEffect(async () => {
    const Division = await getDivisionItem(divisionId);
    setDivision(Division);
    setIsDivision(true);
  }, []);

  const onUpdateDivision = async (values, setErrors, setSubmitting) => {
    try {
      await updateDivision(divisionId, values);
      router.push('/catalog/divisions');
    } catch (error) {
      setErrors(error);
    }
  }

  const initialsValues = {
    Name: division.Name,
    Abbreviation: division.Abbreviation,
    submit: null
  };

  const validationSchema = Yup.object().shape({
    Name: Yup.string()
      .max(255)
      .required('The name field is required'),
    Abbreviation: Yup.string()
      .max(255)
      .required('The abbreviation field is required')
  });

  if(!isDivision) {
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
          p: 4,
          mx: 4
        }}
      >
        <Formik
          initialValues={initialsValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
            await onUpdateDivision(values, setErrors, setSubmitting)
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
                  Update Division
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </>
  )
}

export default UpdateDivisionForm
