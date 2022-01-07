import React from 'react'
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import UpdateProductForm from 'src/content/catalog/products/UpdateProductForm'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function UpdateProduct() {

    return (
        <>
            <Head>
                <title>Products</title>
            </Head>

            {/* Page header: Contains page heading and button to navigate to previous page */}
            <PageHeader
                title={"Products"}
                subtitle={"Update Product"}
                startIcon={<ArrowBackIcon fontSize="small" />}
                content={"Back to List"}
                routeLink={"/catalog/products/"}
            />

            {/* The update brand form */}
            <UpdateProductForm />
        </>
    )
}

UpdateProduct.getLayout = (page) => (
    <Authenticated>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default UpdateProduct
