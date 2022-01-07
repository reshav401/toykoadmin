import React from 'react';
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import Results from 'src/content/Catalog/products/Results';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function Product() {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      {/* Page header: Contains page heading and button to navigate to create page */}
      <PageHeader
        title={"Products"}
        subtitle={"List of products"}
        startIcon={<AddTwoToneIcon fontSize="small" />}
        content={"Create Product"}
        routeLink={"/catalog/products/create"}
      />

      {/* Datagrid */}
      <Results />
    </>
  )
}

Product.getLayout = (page) => (
  <Authenticated>
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default Product
