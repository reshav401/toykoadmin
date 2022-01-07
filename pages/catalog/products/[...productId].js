import React from 'react'
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import ProductItemPage from 'src/content/catalog/products/Item'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ProductItem() {

    return (
        <>
            <Head>
                <title>Products</title>
            </Head>

            {/* Page header: Contains page heading and button to navigate to previous page */}
            <PageHeader
                title={"Products"}
                subtitle={"Product Item"}
                startIcon={<ArrowBackIcon fontSize="small" />}
                content={"Back to List"}
                routeLink={"/catalog/products/"}
            />

            {/* Single product Item page */}
            <ProductItemPage />
        </>
    )
}

ProductItem.getLayout = (page) => (
    <Authenticated>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default ProductItem
