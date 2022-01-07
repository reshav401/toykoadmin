import React from 'react';
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import Results from 'src/content/Catalog/verticals/Results';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function Vertical() {
  return (
    <>
      <Head>
        <title>Verticals</title>
      </Head>

      {/* Page header: Contains page heading and button to navigate to create page */}
      <PageHeader
        title={"Verticals"}
        subtitle={"List of verticals"}
        startIcon={<AddTwoToneIcon fontSize="small" />}
        content={"Create Vertical"}
        routeLink={"/catalog/verticals/create"}
      />

      {/* Datagrid */}
      <Results />

    </>
  )
}

Vertical.getLayout = (page) => (
  <Authenticated>
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default Vertical
