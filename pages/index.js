import React from 'react';

import { Authenticated } from 'src/components/Authenticated';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';

import Head from  'next/head'

function Overview() {
  return (
    <>
      <Head>
          <title>Dashboard</title>
      </Head>
      This is landing Page
    </>
  );
}

export default Overview;

Overview.getLayout = (page) => (
  <Authenticated>
      <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);



