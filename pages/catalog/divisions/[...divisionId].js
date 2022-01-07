import React from 'react'
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import DivisionItemPage from 'src/content/catalog/divisions/Item'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function DivisionItem() {

    return (
        <>
            <Head>
                <title>Divisions</title>
            </Head>

            {/* Page header: Contains page heading and button to navigate to previous page */}
            <PageHeader
                title={"Divisions"}
                subtitle={"Division Item"}
                startIcon={<ArrowBackIcon fontSize="small" />}
                content={"Back to List"}
                routeLink={"/catalog/divisions/"}
            />

            {/* Single division Item page */}
            <DivisionItemPage />
        </>
    )
}

DivisionItem.getLayout = (page) => (
    <Authenticated>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default DivisionItem
