import React from 'react';

import { Authenticated } from 'src/components/Authenticated';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';

function CustomerTypes() {
    return (
        <div>
            
        </div>
    )
}

CustomerTypes.getLayout = (page) => (
    <Authenticated>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default CustomerTypes
