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

import { getBrandItem, updateBrand } from 'src/slices/brand';
import { groupVerticals, getAllVerticals } from 'src/slices/vertical'
import { getAllDivisions } from 'src/slices/division';

import Loader from 'src/components/Loader'

function UpdateBrandForm() {
  const router = useRouter();

  const { brandId } = router.query;

  const [brand, setBrand] = useState({})
  const [divisions, setDivisions] = useState([]);
  const [verticals, setVerticals] = useState([]);
  const [groupedVerticals, setGroupedVerticals] = useState({});
  const [isBrand, setIsBrand] = useState(false);

  useEffect(async () => {
    const resDivisions = await getAllDivisions();
    const resVerticals = await getAllVerticals();
    const resBrand = await getBrandItem(brandId);

    setBrand(resBrand);
    setDivisions(resDivisions);
    setGroupedVerticals(groupVerticals(resDivisions, resVerticals));
    setIsBrand(resBrand)
  }, [])

  useEffect(() => {
    setVerticals(groupedVerticals[brand.DivisionId])
  }, [groupedVerticals])

  const handleVerticals = (DivisionId) => {
    setVerticals(groupedVerticals[DivisionId])
  }

  const onUpdateBrand = async (values, setErrors, setSubmitting) => {
    try {
      await updateBrand(brandId, values);
      router.push('/catalog/brands')
    } catch (error) {
      setErrors(error);
    }
  }

  const initialsValues = {
    Name: brand.Name,
    DivisionId: brand.DivisionId || '',
    VerticalId: brand.VerticalId || '',
    submit: null
  };

  const validationSchema = Yup.object().shape({
    Name: Yup.string()
      .max(255)
      .required('The name field is required'),
    DivisionId: Yup.string()
      .required('The division id field is required'),
    VerticalId: Yup.string()
      .required('The division id field is required')
  });

  if(!isBrand) {
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
            await onUpdateBrand(values, setErrors, setSubmitting)
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
                            VerticalId: '',
                            Name: values.Name,
                          }
                        })
                        handleVerticals(e.target.value);
                      }}
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
                      displayEmpty
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

export default UpdateBrandForm
