import React, { useEffect, useState } from 'react';

import  { useRouter } from 'next/router'

import { getRegionItem } from 'src/slices/region';

import { Card, Grid } from '@mui/material';
import ItemTextField from 'src/components/ItemTextField';

function Item() {
  const router = useRouter();

  const { regionId } = router.query

  const [region, setRegion] = useState({});

  useEffect( async () => {
    const response = await getRegionItem(regionId);
    setRegion(response);
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
              label="Name"
              value={region.Name}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default Item
