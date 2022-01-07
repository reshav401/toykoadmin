import React, { useEffect } from 'react'
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import UpdateVerticalForm from 'src/content/catalog/verticals/UpdateVerticalForm'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function UpdateVertical() {

    return (
        <>
            <Head>
                <title>Verticals</title>
            </Head>

            {/* Page header: Contains page heading and button to navigate to previous page */}
            <PageHeader
                title={"Verticals"}
                subtitle={"Edit Vertical"}
                startIcon={<ArrowBackIcon fontSize="small" />}
                content={"Back to List"}
                routeLink={"/catalog/verticals/"}
            />
            
            {/* The update vertical form */}
            <UpdateVerticalForm />
        </>
    )
}

UpdateVertical.getLayout = (page) => (
    <Authenticated>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default UpdateVertical
