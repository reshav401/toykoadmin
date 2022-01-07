import React, { useEffect, useState } from 'react';

import  { useRouter } from 'next/router'

import { getVerticalItem } from 'src/slices/vertical';

import { Card, Grid } from '@mui/material';
import ItemTextField from 'src/components/ItemTextField';

function Item() {
  const router = useRouter();

  const { verticalId } = router.query

  const [vertical, setVertical] = useState({});

  useEffect( async () => {
    const response = await getVerticalItem(verticalId);
    setVertical(response);
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
              value={vertical.DivisionName}
            />
          </Grid>
          
          <Grid item>
            <ItemTextField 
              label="Name"
              value={vertical.Name}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default Item
