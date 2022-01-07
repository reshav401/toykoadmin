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

import { getAllDivisions } from 'src/slices/division';
import { getVerticalItem, updateVertical } from 'src/slices/vertical';

import Loader from 'src/components/Loader'

function UpdateVerticalForm() {
  const router = useRouter();
 
  const { verticalId } = router.query;
  
  const [divisions, setDivisions] = useState([]);
  const [vertical, setVertical] = useState({});
  const [isVertical, setIsVertical] = useState(false);

  useEffect(async () => {
    const response = await getAllDivisions();
    setDivisions(response);
  }, []);

  useEffect(async () => {
    const response = await getVerticalItem(verticalId);
    setVertical(response);
    setIsVertical(true);
  }, []);

  const onUpdateVertical = async (values, setErrors, setSubmitting) => {
    try {
      await updateVertical(values);
      router.push('/catalog/verticals');
    } catch (error) {
      setErrors(error);
    }
  };

  const initialsValues = {
    Name: vertical.Name,
    DivisionId: vertical.DivisionId,
    submit: null
  };

  const validationSchema = Yup.object().shape({
    Name: Yup.string()
      .max(255)
      .required('The name field is required'),
    DivisionId: Yup.string()
      .required('The division id field is required')
  });

  if(!isVertical) {
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
            await onUpdateVertical(values, setErrors, setSubmitting)
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
                  <FormControl fullWidth>
                    <InputLabel id="division-select-tag">Division</InputLabel>
                    <Select
                      labelId="division-select-tag"
                      error={Boolean(touched.DivisionId && errors.DivisionId)}
                      id="division"
                      name="DivisionId"
                      label="Division"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.DivisionId}
                      variant="outlined"
                      displayEmpty
                    >
                      {divisions.map((division, key) => (
                        <MenuItem key={key} value={division.Id}>{division.Name}</MenuItem>
                      ))}
                    </Select>
                    {touched.DivisionId && errors.DivisionId && (
                      <Typography color="red"  >{errors.DivisionId}</Typography>
                    )}
                  </FormControl>
                </Grid>

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
                  Update Vertical
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </>
  )
}

export default UpdateVerticalForm
