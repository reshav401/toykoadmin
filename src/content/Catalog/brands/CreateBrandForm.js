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

import { createBrand } from 'src/slices/brand';
import { groupVerticals, getAllVerticals } from 'src/slices/vertical'
import { getAllDivisions } from 'src/slices/division';

const initialsValues = {
  DivisionId: '',
  VerticalId: '',
  Name: '',
  submit: null
}

function CreateBrandForm() {

  const router = useRouter();

  const [divisions, setDivisions] = useState([]);
  const [verticals, setVerticals] = useState([]);
  const [groupedVerticals, setGroupedVerticals] = useState({});

  useEffect(async () => {
    const resDivisions = await getAllDivisions();
    const resVerticals = await getAllVerticals();

    setDivisions(resDivisions);
    setGroupedVerticals(groupVerticals(resDivisions, resVerticals));
  }, []);

  

  const handleVerticals = (DivisionId) => {
    setVerticals(groupedVerticals[DivisionId])
  }

  const onAddBrand = async (values, { setErrors }) => {
    try {
      await createBrand(values);
      router.push('/catalog/brands')
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
      .required('The division field is required'),
    VerticalId: Yup.string()
      .required('The division field is required')
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
            await onAddBrand(values, setErrors)
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
                  <FormControl fullWidth>
                    <InputLabel id="division-select-tag">Division</InputLabel>
                    <Select
                      labelId="division-select-tag"
                      error={Boolean(touched.DivisionId && errors.DivisionId)}
                      id="division"
                      name="DivisionId"
                      label="Division"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        resetForm({
                          values: {
                            DivisionId: e.target.value,
                            Name: values.Name,
                            VerticalId: ''
                          }
                        })
                        handleVerticals(e.target.value);
                      }}
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
                  <FormControl fullWidth>
                    <InputLabel id="vertical-select-tag">Vertical</InputLabel>
                    <Select
                      labelId="vertical-select-tag"
                      error={Boolean(touched.VerticalId && errors.VerticalId)}
                      id="vertical"
                      name="VerticalId"
                      label="Vertical"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.VerticalId}
                      variant="outlined"
                    >
                      {verticals.map((vertical, key) => (
                        <MenuItem key={key} value={vertical.Id}>{vertical.Name}</MenuItem>
                      ))}
                    </Select>
                    {touched.VerticalId && errors.VerticalId && (
                      <Typography color="red"  >{errors.VerticalId}</Typography>
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
                  Add Brand
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </>
  )
}

export default CreateBrandForm
