import React from 'react'
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import UpdateBrandForm from 'src/content/catalog/brands/UpdateBrandForm'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function UpdateBrand() {

    return (
        <>
            <Head>
                <title>Brands</title>
            </Head>
            
            {/* Page header: Contains page heading and button to navigate to previous page */}
            <PageHeader
                title={"Brands"}
                subtitle={"Brand Item"}
                startIcon={<ArrowBackIcon fontSize="small" />}
                content={"Back to List"}
                routeLink={"/catalog/brands/"}
            />

            {/* The update brand form */}
            <UpdateBrandForm />
        </>
    )
}

UpdateBrand.getLayout = (page) => (
    <Authenticated>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default UpdateBrand
