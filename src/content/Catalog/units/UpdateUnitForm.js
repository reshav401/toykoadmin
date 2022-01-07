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

import { getUnitItem, updateUnit } from 'src/slices/unit';

import Loader from 'src/components/Loader'

function UpdateUnitForm() {
  const router = useRouter();

  const { unitId } = router.query;

  const [unit, setUnit] = useState({});
  const [isUnit, setIsUnit] = useState(false);

  useEffect(async () => {
    const Unit = await getUnitItem(unitId);
    setUnit(Unit);
    setIsUnit(true);
  }, []);

  const onUpdateUnit = async (values, setErrors, setSubmitting) => {
    try {
      await updateDivision(unitId, values);
      router.push('/catalog/units');

    } catch (error) {
      setErrors(error);
    }
  }

  const initialsValues = {
    Name: unit.Name,
    submit: null
  };

  const validationSchema = Yup.object().shape({
    Name: Yup.string()
      .max(255)
      .required('The name field is required'),
  });

  if(!isUnit) {
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
            await onUpdateUnit(values, setErrors, setSubmitting)
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
                  Update Unit
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </>
  )
}

export default UpdateUnitForm
