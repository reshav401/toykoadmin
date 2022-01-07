import React from 'react';
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import Results from 'src/content/locations/regions/Results';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function Regions() {

  return (
    <>
      <Head>
        <title>Brands</title>
      </Head> 
      
      <PageHeader
        title={"Regions"}
        subtitle={"List of Regions"}
        startIcon={<AddTwoToneIcon fontSize="small" />}
        content={"Create Region"}
        routeLink={"/regions/create"}
      />
      <Results /> 
    </>
  )
}

Regions.getLayout = (page) => (
  <Authenticated>
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default Regions;
