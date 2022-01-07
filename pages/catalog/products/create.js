import React from 'react';
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import CreateProductForm from 'src/content/catalog/products/CreateProductForm'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CreateProduct() {

    return (
        <>
            <Head>
                <title>Products</title>
            </Head>

            {/* Page header: Contains page heading and button to navigate to previous page */}
            <PageHeader
                title={"Products"}
                subtitle={"Create a new product"}
                startIcon={<ArrowBackIcon fontSize="small" />}
                content={"Back to List"}
                routeLink={"/catalog/products/"}
            />

            {/* The create brand form */}
            <CreateProductForm />
        </>
    )
}

CreateProduct.getLayout = (page) => (
    <Authenticated>
      <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default CreateProduct
