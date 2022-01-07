import React from 'react';
import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';
import PageHeader from 'src/components/PageHeader';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import CreateUnitForm from 'src/content/catalog/units/CreateUnitForm'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CreateUnit() {

    return (
        <>
            <Head>
                <title>Units</title>
            </Head>

            {/* Page header: Contains page heading and button to navigate to previous page */}
            <PageHeader
                title={"Units"}
                subtitle={"Create a new unit"}
                startIcon={<ArrowBackIcon fontSize="small" />}
                content={"Back to List"}
                routeLink={"/catalog/units/"}
            />
            
            {/* The create unit form */}
            <CreateUnitForm />  
            
        </>
    )
}

CreateUnit.getLayout = (page) => (
    <Authenticated>
      <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default CreateUnit
