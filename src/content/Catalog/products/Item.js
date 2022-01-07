import React, { useEffect, useState } from 'react';

import  { useRouter } from 'next/router'

import { getProductItem } from 'src/slices/product';

import { 
  Card, 
  Grid, 
  TextField,
  Typography,  
} from '@mui/material';
import { withStyles } from '@mui/styles';

import ItemTextField from 'src/components/ItemTextField';

const CssTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      }
    },
  },
})(TextField);

function Item() {
  const router = useRouter();

  const { productId } = router.query

  const [product, setProduct] = useState({});

  useEffect( async () => {
    const response = await getProductItem(productId);
    setProduct(response);
  }, []);


  return (
    <>
      <Card
        sx={{
          p:4,
          mx: 4
        }}
      >
        <Grid 
          container
          direction="column" 
        >
          <Grid item>
            <ItemTextField 
              label="Division"
              value={product.DivisionName}
            />
          </Grid>

          <Grid item>
            <ItemTextField 
              label="Vertical"
              value={product.VerticalName}
            />
          </Grid>

          <Grid item>
            <ItemTextField 
              label="Brand"
              value={product.BrandName}
            />
          </Grid>
          
          <Grid item>
            <ItemTextField 
              label="SAP Code"
              value={product.SapCode}
            />
          </Grid>

          <Grid item>
            <ItemTextField 
              label="Name"
              value={product.Name}
            />
          </Grid>

          <Grid item>
            <ItemTextField 
              label="Dcode"
              value={product.Dcode}
            />
          </Grid>

          <Grid item>
            <ItemTextField 
              label="Dname"
              value={product.Dname}
            />
          </Grid>

          <Grid item>
            <ItemTextField 
              label="Unit"
              value={product.UnitName}
            />
          </Grid>

          <Grid item >
            <Typography variant="h5" component="h5" gutterBottom>
              Is Featured?
            </Typography>
            {product.IsFeatured ? (
              <CssTextField
                variant="outlined"
                value={"Yes"}
                InputProps={{
                  readOnly: true,
                }}
                size="small"
              />
            ): (
              <CssTextField
                variant="outlined"
                value={"No"}
                InputProps={{
                  readOnly: true,
                }}
                size="small"
              />
            )}
          </Grid>

        </Grid>
      </Card>
    </>
  )
}

export default Item
