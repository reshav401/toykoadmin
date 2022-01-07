import React from 'react'
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import UpdateDivisionForm from 'src/content/catalog/divisions/UpdateDivisionForm'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function UpdateDivision() {

    return (
        <>
            <Head>
                <title>Divisions</title>
            </Head>

            {/* Page header: Contains page heading and button to navigate to previous page */}
            <PageHeader
                title={"Divisions"}
                subtitle={"Edit Division"}
                startIcon={<ArrowBackIcon fontSize="small" />}
                content={"Back to List"}
                routeLink={"/catalog/divisions/"}
            />

            {/* Update division form */}
            <UpdateDivisionForm />
        </>
    )
}

UpdateDivision.getLayout = (page) => (
    <Authenticated>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default UpdateDivision
