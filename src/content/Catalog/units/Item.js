import React, { useEffect, useState } from 'react';

import  { useRouter } from 'next/router'

import { getUnitItem } from 'src/slices/unit';

import { Card, Grid } from '@mui/material';
import ItemTextField from 'src/components/ItemTextField';

function Item() {
  const router = useRouter();

  const { unitId } = router.query

  const [unit, setUnit] = useState({});

  useEffect(async () => {
     // Getting division item
     const Unit = await getUnitItem(unitId);
     setUnit(Unit);
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
              value={unit.Name}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default Item
