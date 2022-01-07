import { createSlice } from '@reduxjs/toolkit';
import { createApiEndpoint, ENDPOINTS } from 'src/apiServices';

const initialState = {
    regions: [],
    page: 0,
    limit: 10,
    count: 0,
    loading: true,
    sortModel: [{field: 'Name', sort: 'asc'}],
    filters: {}
};

const slice = createSlice({
    name: 'regions',
    initialState,
    reducers: {
        getRegions(state, action) {
            state.regions = action.payload;
            state.regions.map((b) => b.id = b.Id);
        },

        setLimit(state, action) {
            state.limit = action.payload;
        },

        setPage(state, action) {
            state.page = action.payload;
        },

        setCount(state, action) {
            state.count = action.payload;
        },

        setSortModel(state, action) {
            state.sortModel = action.payload;
        },

        setFilters(state, action) {
            state.filters = action.payload
        },

        setLoading(state, action) {
            state.loading = action.payload;
        }
    }
});

export const { reducer } = slice;

export const getRegions = (state) => async (dispatch) => {
    dispatch(slice.actions.setLoading(true));

    const response = await createApiEndpoint(ENDPOINTS.REGION).fetchAll(state.limit, state.page + 1, state.sortModel[0].field, state.sortModel[0].sort, state.filters);

    dispatch(slice.actions.getRegions(response.data.Data));
    dispatch(slice.actions.setCount(response.data.TotalRecords));
    dispatch(slice.actions.setLoading(false));
}

export const getRegionItem = async (id) => {
    const response = await createApiEndpoint(ENDPOINTS.REGION).fetchById(id);
    return response.data.Region;
};

export const getAllRegions = async () => {
    const response = await createApiEndpoint(ENDPOINTS.REGION).All();
    return response.data.Regions;
};

export const searchRegions = (page, text, filters) => async () => {
    const response = await createApiEndpoint(ENDPOINTS.REGION).Search(page, text, filters);
    return response.data.Regions;
};

export const createRegion = async (createData) => {
    await createApiEndpoint(ENDPOINTS.REGION).create(createData);
};

export const updateRegion = async (id, updateData) => {
    await createApiEndpoint(ENDPOINTS.REGION).update(id, updateData);
};

export const deleteRegion = (id) => async(dispatch) => {
    await createApiEndpoint(ENDPOINTS.REGION).delete(id);
}

export const setLimit = (limit) => async (dispatch) => {
    dispatch(slice.actions.setLimit(limit));
};

export const setPage = (page) => async (dispatch) => {
    dispatch(slice.actions.setPage(page));
};

export const setCount = (count) => async (dispatch) => {
    dispatch(slice.actions.setCount(count));
};

export const setSortModel = (sortModel) => async (dispatch) => {
    dispatch(slice.actions.setSortModel(sortModel));
};

export const setLoading = (loading) => async (dispatch) => {
    dispatch(slice.actions.setLoading(loading));
};

export const setFilters = (filters) => async (dispatch) => {
    dispatch(slice.actions.setFilters(filters));
}

export default slice;
