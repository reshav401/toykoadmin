import React from 'react';
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import Results from 'src/content/Catalog/divisions/Results';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function Division() {

  return (
    <>
      <Head>
        <title>Divisions</title>
      </Head>

      {/* Page header: Contains page heading and button to navigate to create page */}
      <PageHeader
        title={"Divisions"}
        subtitle={"List of divisions"}
        startIcon={<AddTwoToneIcon fontSize="small" />}
        content={"Create Division"}
        routeLink={"/catalog/divisions/create"}
      />

      {/* Datagrid */}
      <Results />

    </>
  )
}

Division.getLayout = (page) => (
  <Authenticated>
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default Division
