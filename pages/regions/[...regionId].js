import React from 'react'
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import RegionItemPage from 'src/content/locations/regions/Item'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function RegionItem() {

    return (
        <>
            <Head>
                <title>Regions</title>
            </Head>

            {/* Page header: Contains page heading and button to navigate to previous page */}
            <PageHeader
                title={"Regions"}
                subtitle={"Region Item"}
                startIcon={<ArrowBackIcon fontSize="small" />}
                content={"Back to List"}
                routeLink={"/regions/"}
            />
            
            {/* Single brand Item page */}
            <RegionItemPage />
        </>
    )
}

RegionItem.getLayout = (page) => (
    <Authenticated>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default RegionItem
