import React from 'react'
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import UnitItemPage from 'src/content/catalog/units/Item'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function UnitItem() {

    return (
        <>
            <Head>
                <title>Units</title>
            </Head>

            {/* Page header: Contains page heading and button to navigate to previous page */}
            <PageHeader
                title={"Units"}
                subtitle={"Unit Item"}
                startIcon={<ArrowBackIcon fontSize="small" />}
                content={"Back to List"}
                routeLink={"/catalog/units/"}
            />

            {/* Single unit Item page */}
            <UnitItemPage />
        </>
    )
}

UnitItem.getLayout = (page) => (
    <Authenticated>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default UnitItem
