import React, { useEffect, useState } from 'react';

import { Authenticated } from 'src/components/Authenticated';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';

import { createApiEndpoint, ENDPOINTS } from 'src/apiServices';

import { AsyncPaginate } from 'react-select-async-paginate';

function Customers() {

    async function loadOptions(search, loadedOptions, { page }) {
        const response = await createApiEndpoint(ENDPOINTS.BRAND + "/getbyquery").fetchByQuery(search, page)

        return {
            options: response.data.Data,
            hasMore: response.data.HasMore,
            additional: {
                page: page + 1,
            },
        }

    }

    const [value, setValue] = useState("");

    console.log(value)

    return (
        <div>
            <div>
                <h1>react-select-async-paginate</h1>
                <h2>Simple example</h2>

                <AsyncPaginate
                    debounceTimeout={300}
                    value={value}
                    loadOptions={loadOptions}
                    onChange={(e) => setValue(e)}
                    additional={{
                        page: 0,
                    }}
                />
            </div>
        </div>
    )
}

Customers.getLayout = (page) => (
    <Authenticated>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
);

export default Customers
