import { createSlice } from '@reduxjs/toolkit';
import { createApiEndpoint, ENDPOINTS } from 'src/apiServices';

const initialState = {
  verticals: [],
  page: 0,
  limit: 10,
  count: 0,
  loading: true,
  sortModel: [{field: 'Name', sort: 'asc'}],
  filters: {}
};

const slice = createSlice({
  name: 'verticals',
  initialState,
  reducers: {
    getVerticals(state, action) {
      state.verticals = action.payload;
      state.verticals.map((b) => b.id = b.Id);
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
      state.filters = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    }
  }
});

export const { reducer } = slice;

export const getVerticals = (state) => async (dispatch) => {
    dispatch(slice.actions.setLoading(true))
    const response = await createApiEndpoint(ENDPOINTS.VERTICAL).fetchAll(state.limit, state.page + 1, state.sortModel[0].field, state.sortModel[0].sort, state.filters);

    dispatch(slice.actions.getVerticals(response.data.Data));
    dispatch(slice.actions.setCount(response.data.TotalRecords));
    dispatch(slice.actions.setLoading(false));
};

export const getVerticalItem = async (id) => {
  const response = await createApiEndpoint(ENDPOINTS.VERTICAL).fetchById(id);
  return response.data.Vertical;
};

export const getAllVerticals = async () => {
  const response = await createApiEndpoint(ENDPOINTS.VERTICAL).All();
  return response.data.Verticals;
};

export const searchVerticals = async (page, text, filters) => {
  const response = await createApiEndpoint(ENDPOINTS.VERTICAL).Search(page, text, filters);
  return response.data.Verticals;
};

export const createVertical = async (createData) => {
  await createApiEndpoint(ENDPOINTS.VERTICAL).create(createData);
};

export const updateVertical = async (id, updateData) => {
  await createApiEndpoint(ENDPOINTS.VERTICAL).update(id, updateData);
};

export const deleteVertical = (id) => async() => {
  await createApiEndpoint(ENDPOINTS.VERTICAL).delete(id);
};

export const groupVerticals = (divisions, verticals) => {
  const groupedVerticals = {};

  divisions.map((division) => {
    groupedVerticals[division.Id] = [];
    verticals.map((vertical) => {
      if(division.Id == vertical.DivisionId){
        groupedVerticals[division.Id].push({
          Id: vertical.Id,
          Name: vertical.Name
        });
      };
    });
  });

  return groupedVerticals;
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

export const setFilters = (filters) => async (dispatch) => {
  dispatch(slice.actions.setFilters(filters));
}

export default slice;
