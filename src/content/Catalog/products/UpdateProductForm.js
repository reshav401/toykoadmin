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

import { Field, Formik } from 'formik';
import * as Yup from 'yup';

import { getAllDivisions } from 'src/slices/division';
import { groupVerticals, getAllVerticals } from 'src/slices/vertical'
import { groupBrands, getAllBrands } from 'src/slices/brand';
import { getAllUnits } from 'src/slices/unit';
import { updateProduct, getProductItem } from 'src/slices/product';

import Loader from 'src/components/Loader'

function UpdateProductForm() {
  const router = useRouter();

  const { productId } = router.query;

  const [divisions, setDivisions] = useState([]);
  const [verticals, setVerticals] = useState([]);
  const [brands, setBrands] = useState([]);
  const [units, setUnits] = useState([]);
  const [groupedVerticals, setGroupedVerticals] = useState({});
  const [groupedBrands, setGroupedBrands] = useState({});
  const [product, setProduct] = useState({});
  const [isProduct, setIsProduct] = useState(false);

  useEffect(async () => {
    const resDivisions = await getAllDivisions();
    const resVerticals = await getAllVerticals();
    const resBrands = await getAllBrands();
    const resUnits = await getAllUnits();
    const Product = await getProductItem(productId);

    setProduct(Product);
    setDivisions(resDivisions);
    setUnits(resUnits);
    setGroupedVerticals(groupVerticals(resDivisions, resVerticals));
    setGroupedBrands(groupBrands(resVerticals, resBrands));
    setIsProduct(true);
  }, []);

  useEffect(() => {
    setVerticals(groupedVerticals[product.DivisionId])
    setBrands(groupedBrands[product.VerticalId])
  }, [groupedVerticals, groupedBrands])

  const handleVerticals = (DivisionId) => {
    setVerticals(groupedVerticals[DivisionId])
  }

  const handleBrands = (VerticalId) => {
    setBrands(groupedBrands[VerticalId])
  }

  const onUpdateProduct = (values, setErrors, setSubmitting) => {
    try {
      setSubmitting(true)
      createApiEndpoint(ENDPOINTS.PRODUCT).update(productId, values)
      .then(res => {
        router.push("/catalog/products/" + productId);
      })
      .catch(err => setErrors(err));

    } catch (error) {
      setErrors(error);
    }
  }

  const initialsValues = {
    DivisionId: product.DivisionId || '',
    VerticalId: product.VerticalId || '',
    BrandId: product.BrandId || '',
    SapCode: product.SapCode || '',
    Name: product.Name || '',
    Dcode: product.Dcode || '',
    Dname: product.Dname || '',
    UnitId: product.UnitId || '',
    IsFeatured: product.IsFeatured,
    IsActive: product.IsActive,
    submit: null
  };

  const validationSchema = Yup.object().shape({
    Name: Yup.string()
    .max(255)
    .required('The name field is required'),
    DivisionId: Yup.string()
      .required('The division field is required'),
    VerticalId: Yup.string()
      .required('The division field is required'),
    BrandId: Yup.string()
      .required('The division field is required'),
    SapCode: Yup.string()
      .max(255)
      .required('The sapcode field is required'),
    Dcode: Yup.string()
      .max(255)
      .required('The dcode field is required'),
    Dname: Yup.string()
      .max(255)
      .required('The dname field is required'),
    UnitId: Yup.string()
      .required('The unit field is required'),
  });

  if(!isProduct) {
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
          p:4,
          mx: 4
        }}
      >
        <Formik
          initialValues={initialsValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
            await onUpdateProduct(values, setErrors, setSubmitting)
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
                            BrandId: '',
                            Name: values.Name,
                            SapCode: values.SapCode,
                            Dcode: values.Dcode,
                            Dname: values.Dname,
                            UnitId: values.UnitId,
                            IsActive: values.IsActive,
                            IsFeatured: values.IsFeatured
                          }
                        })
                        handleVerticals(e.target.value);
                        setBrands([]);
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
                      onChange={(e) => {
                        resetForm({
                          values: {
                            DivisionId: values.DivisionId,
                            VerticalId: e.target.value,
                            BrandId: '',
                            Name: values.Name,
                            SapCode: values.SapCode,
                            Dcode: values.Dcode,
                            Dname: values.Dname,
                            UnitId: values.UnitId,
                            IsActive: values.IsActive,
                            IsFeatured: values.IsFeatured
                          }
                        });
                        handleBrands(e.target.value)
                      }}
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
                  <FormControl fullWidth>
                    <InputLabel id="brand-select-tag">Brand</InputLabel>
                    <Select
                      labelId="brand-select-tag"
                      error={Boolean(touched.BrandId && errors.BrandId)}
                      id="brand"
                      name="BrandId"
                      label="Brand"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.BrandId}
                      variant="outlined"
                    >
                      {brands.map((brand, key) => (
                        <MenuItem key={key} value={brand.Id}>{brand.Name}</MenuItem>
                      ))}
                    </Select>
                    {touched.BrandId && errors.BrandId && (
                      <Typography color="red"  >{errors.BrandId}</Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    error={Boolean(touched.SapCode && errors.SapCode)}
                    fullWidth
                    helperText={touched.SapCode && errors.SapCode}
                    label='SAP Code'
                    name="SapCode"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.SapCode}
                    variant="outlined"
                  />
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

                <Grid item xs={12}>
                  <TextField
                    error={Boolean(touched.Dcode && errors.Dcode)}
                    fullWidth
                    helperText={touched.Dcode && errors.Dcode}
                    label='Dcode'
                    name="Dcode"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Dcode}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    error={Boolean(touched.Dname && errors.Dname)}
                    fullWidth
                    helperText={touched.Dname && errors.Dname}
                    label='Dname'
                    name="Dname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Dname}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="unit-select-tag">Unit</InputLabel>
                    <Select
                      labelId="unit-select-tag"
                      error={Boolean(touched.UnitId && errors.UnitId)}
                      id="unit"
                      name="UnitId"
                      label="Unit"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.UnitId}
                      variant="outlined"
                    >
                      {units.map((unit, key) => (
                        <MenuItem key={key} value={unit.Id}>{unit.Name}</MenuItem>
                      ))}
                    </Select>
                    {touched.UnitId && errors.UnitId && (
                      <Typography color="red"  >{errors.UnitId}</Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Field type="checkbox" name="IsFeatured" /> Is Featured?
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
                  Update Product
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </>
  )
}

export default UpdateProductForm
