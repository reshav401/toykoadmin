import React from 'react';
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import CreateDivisionForm from 'src/content/catalog/divisions/CreateDivisionForm'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CreateDivision() {

    return (
        <>
            <Head>
                <title>Divisions</title>
            </Head>

            {/* Page header: Contains page heading and button to navigate to previous page */}
            <PageHeader
                title={"Divisions"}
                subtitle={"Create a new division"}
                startIcon={<ArrowBackIcon fontSize="small" />}
                content={"Back to List"}
                routeLink={"/catalog/divisions/"}
            />
            
            {/* The create division form */}
            <CreateDivisionForm />
        </>
    )
}

CreateDivision.getLayout = (page) => (
    <Authenticated>
      <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default CreateDivision
