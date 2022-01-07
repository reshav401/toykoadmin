import React from 'react'
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import VerticalItemPage from 'src/content/catalog/verticals/Item'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function VerticalItem() {

    return (
        <>
            <Head>
                <title>Verticals</title>
            </Head>

            {/* Page header: Contains page heading and button to navigate to previous page */}
            <PageHeader
                title={"Verticals"}
                subtitle={"Vertical Item"}
                startIcon={<ArrowBackIcon fontSize="small" />}
                content={"Back to List"}
                routeLink={"/catalog/verticals/"}
            />

            {/* Single vertical Item page */}
            <VerticalItemPage />
        </>
    )
}

VerticalItem.getLayout = (page) => (
    <Authenticated>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default VerticalItem
