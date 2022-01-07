import { createSlice } from '@reduxjs/toolkit';
import { createApiEndpoint, ENDPOINTS } from 'src/apiServices';

const initialState = {
  units: [],
  page: 0,
  limit: 10,
  count: 0,
  loading: true,
  sortModel: [{field: 'Name', sort: 'asc'}]
};

const slice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    getUnits(state, action) {
      state.units = action.payload;
      state.units.map((b) => b.id = b.Id);
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

    setLoading(state, action) {
      state.loading = action.payload;
    }
  }
});

export const { reducer } = slice;

export const getUnits = (state) => async (dispatch) => {
  try {
    const response = await createApiEndpoint(ENDPOINTS.UNIT).fetchAll(state.limit, state.page + 1, state.sortModel[0].field, state.sortModel[0].sort, state.filters);

    dispatch(slice.actions.getUnits(response.data.Data));
    dispatch(slice.actions.setCount(response.data.TotalRecords));
    dispatch(slice.actions.setLoading(false));
  } catch (error) {
    alert(`The error has occured. Please refresh the page or contact the adminstrator`);
    console.log(error);
  }
};

export const getUnitItem = async (id) => {
  const response = await createApiEndpoint(ENDPOINTS.UNIT).fetchById(id);
  return response.data.Unit;
};

export const getAllUnits = async () => {
  const response = await createApiEndpoint(ENDPOINTS.UNIT).All();
  return response.data.Units;
};

export const createUnit = async (createData) => {
  await createApiEndpoint(ENDPOINTS.UNIT).create(createData);
};

export const updateUnit = async (id, updateData) => {
  await createApiEndpoint(ENDPOINTS.UNIT).update(id, updateData);
};

export const deleteUnit = (id) => async(dispatch) => {
  dispatch(slice.actions.setLoading(true));
  await createApiEndpoint(ENDPOINTS.UNIT).delete(id);
  dispatch(slice.actions.setLoading(false));
};

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

export default slice;
