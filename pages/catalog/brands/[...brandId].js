import React from 'react'
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import BrandItemPage from 'src/content/catalog/brands/Item'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function BrandItem() {

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
            
            {/* Single brand Item page */}
            <BrandItemPage />
        </>
    )
}

BrandItem.getLayout = (page) => (
    <Authenticated>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default BrandItem
