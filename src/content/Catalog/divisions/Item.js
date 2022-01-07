import React, { useEffect, useState } from 'react';

import  { useRouter } from 'next/router'

import { getDivisionItem } from 'src/slices/division';

import { Card, Grid } from '@mui/material';
import ItemTextField from 'src/components/ItemTextField';

function Item() {
  const router = useRouter();

  const { divisionId } = router.query;

  const [division, setDivision] = useState({});

  useEffect(async () => {
    // Getting division item
    const Division = await getDivisionItem(divisionId);
    setDivision(Division);
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
          spacing={2}
        >
          <Grid item>
            <ItemTextField 
              label="Name"
              value={division.Name}
            />
          </Grid>
          
          <Grid item>
            <ItemTextField 
              label="Abbreviation"
              value={division.Abbreviation}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default Item
