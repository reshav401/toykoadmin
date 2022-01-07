import { createSlice } from '@reduxjs/toolkit';
import { createApiEndpoint, ENDPOINTS } from 'src/apiServices';

const initialState = {
  divisions: [],
  page: 0,
  limit: 10,
  count: 0,
  loading: true,
  sortModel: [{field: 'Name', sort: 'asc'}],
  filters: {}
};

const slice = createSlice({
  name: 'divisions',
  initialState,
  reducers: {
    getDivisions(state, action) {
      state.divisions = action.payload;
      state.divisions.map((b) => b.id = b.Id);
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

    setFilter(state, action) {
      state.filters = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    }
  }
});

export const { reducer } = slice;

export const getDivisions = (state) => async (dispatch) => {
  dispatch(slice.actions.setLoading(true));
  try {
    const response = await createApiEndpoint(ENDPOINTS.DIVISION).fetchAll(state.limit, state.page + 1, state.sortModel[0].field, state.sortModel[0].sort, state.filters);


    dispatch(slice.actions.getDivisions(response.data.Data));
    dispatch(slice.actions.setCount(response.data.TotalRecords));
  } catch (error) {
    // alert(`The error has occured. Please refresh the page or contact the adminstrator`);
    if(error.response) {
      if(error.response.status == 403) {
        Alert(error.response)
      }
    }
  }
  dispatch(slice.actions.setLoading(false));
};

export const getDivisionItem = async (id) => {
  const response = await createApiEndpoint(ENDPOINTS.DIVISION).fetchById(id);
  return response.data.Division;
};

export const getAllDivisions = async () => {
  const response = await createApiEndpoint(ENDPOINTS.DIVISION).All();
  return response.data.Divisions;
};

export const createDivision = async (createData) => {
  await createApiEndpoint(ENDPOINTS.DIVISION).create(createData);
};

export const updateDivision = async (id, updateData) => {
  await createApiEndpoint(ENDPOINTS.DIVISION).update(id, updateData);
};

export const deleteDivision = (id) => async (dispatch) => {
  await createApiEndpoint(ENDPOINTS.DIVISION).delete(id);
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

export const setFilters = (filters) => async (dispatch) => {
  dispatch(slice.actions.setFilter(filters));
}

export const setLoading = (loading) => async (dispatch) => {
  dispatch(slice.actions.setLoading(loading));
};

export default slice;
