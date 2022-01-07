import React, { useEffect, useState } from 'react';

import  { useRouter } from 'next/router'

import { getBrandItem } from 'src/slices/brand';

import { Card, Grid } from '@mui/material';
import ItemTextField from 'src/components/ItemTextField';

function Item() {
  const router = useRouter();

  const { brandId } = router.query

  const [brand, setBrand] = useState({});

  useEffect( async () => {
    const response = await getBrandItem(brandId);
    setBrand(response);
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
              value={brand.DivisionName}
            />
          </Grid>

          <Grid item>
            <ItemTextField 
              label="Vertical"
              value={brand.VerticalName}
            />
          </Grid>
          
          <Grid item>
            <ItemTextField 
              label="Name"
              value={brand.Name}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default Item
