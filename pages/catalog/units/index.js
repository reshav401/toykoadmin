import React from 'react';
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import Results from 'src/content/Catalog/units/Results';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function Unit() {
  return (
    <>
      <Head>
        <title>Units</title>
      </Head>

      {/* Page header: Contains page heading and button to navigate to create page */}
      <PageHeader
        title={"Units"}
        subtitle={"List of units"}
        startIcon={<AddTwoToneIcon fontSize="small" />}
        content={"Create Unit"}
        routeLink={"/catalog/units/create"}
      />

      {/* Datagrid */}
      <Results />
    </>
  )
}

Unit.getLayout = (page) => (
  <Authenticated>
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default Unit
