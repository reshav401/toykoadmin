import React from 'react';
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import CreateBrandForm from 'src/content/catalog/brands/CreateBrandForm'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CreateBrand() {

    return (
        <>
            <Head>
                <title>Brands</title>
            </Head>

            {/* Page header: Contains page heading and button to navigate to previous page */}
            <PageHeader
                title={"Brands"}
                subtitle={"Create a new brand"}
                startIcon={<ArrowBackIcon fontSize="small" />}
                content={"Back to List"}
                routeLink={"/catalog/brands/"}
            />

            {/* The create brand form */}
            <CreateBrandForm />
        </>
    )
}

CreateBrand.getLayout = (page) => (
    <Authenticated>
      <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default CreateBrand
