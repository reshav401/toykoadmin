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

import { createVertical } from 'src/slices/vertical';
import { getAllDivisions } from 'src/slices/division';

const initialsValues = {
  DivisionId: '',
  Name: '',
  submit: null
}

function CreateVerticalForm() {

  const router = useRouter();

  const [divisions, setDivisions] = useState([]);

  useEffect(async () => {
    const response = await getAllDivisions();
    setDivisions(response)
  }, [])

  const onAddVerticals = async (values, { setErrors }) => {
    try {
      await createVertical(values);
      router.push('/catalog/verticals')
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
    DivisionId: Yup.string()
      .required('The division field is required')
  })

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
            await onAddVerticals(values, setErrors)
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
                  Add Vertical
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </>
  )
}

export default CreateVerticalForm
