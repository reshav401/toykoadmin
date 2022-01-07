import React from 'react';
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import CreateVerticalForm from 'src/content/catalog/verticals/CreateVerticalForm'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CreateVertical() {

    return (
        <>
            <Head>
                <title>Verticals</title>
            </Head>

            {/* Page header: Contains page heading and button to navigate to previous page */}
            <PageHeader
                title={"Verticals"}
                subtitle={"Create a new vertical"}
                startIcon={<ArrowBackIcon fontSize="small" />}
                content={"Back to List"}
                routeLink={"/catalog/verticals/"}
            />

            {/* The create vertical form */}
            <CreateVerticalForm />
        </>
    )
}

CreateVertical.getLayout = (page) => (
    <Authenticated>
      <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default CreateVertical
