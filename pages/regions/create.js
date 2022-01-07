import React from 'react';
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import CreateRegionForm from 'src/content/locations/regions/CreateRegionForm'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CreateRegion() {

    return (
        <>
            <Head>
                <title>Brands</title>
            </Head>

            {/* Page header: Contains page heading and button to navigate to previous page */}
            <PageHeader
                title={"Regions"}
                subtitle={"Create a new region"}
                startIcon={<ArrowBackIcon fontSize="small" />}
                content={"Back to List"}
                routeLink={"/regions/"}
            />

            {/* The create brand form */}
            <CreateRegionForm />
        </>
    )
}

CreateRegion.getLayout = (page) => (
    <Authenticated>
      <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default CreateRegion
