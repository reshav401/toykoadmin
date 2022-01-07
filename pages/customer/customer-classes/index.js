import React from 'react';

import { Authenticated } from 'src/components/Authenticated';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';

function CustomerClasses() {
    return (
        <div>
            
        </div>
    )
}

CustomerClasses.getLayout = (page) => (
        <Authenticated>
            <AccentHeaderLayout>{page}</AccentHeaderLayout>
        </Authenticated>
);

export default CustomerClasses
