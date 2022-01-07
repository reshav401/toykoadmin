import React from 'react';
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import Results from 'src/content/Catalog/brands/Results';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function Brand() {

  return (
    <>
      <Head>
        <title>Brands</title>
      </Head>

      {/* Page header: Contains page heading and button to navigate to create page */}
      <PageHeader
        title={"Brands"}
        subtitle={"List of brands"}
        startIcon={<AddTwoToneIcon fontSize="small" />}
        content={"Create Brand"}
        routeLink={"/catalog/brands/create"}
      />

      {/* Datagrid */}
      <Results />
    </>
  )
}

Brand.getLayout = (page) => (
  <Authenticated>
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default Brand
