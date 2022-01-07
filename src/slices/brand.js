import { createSlice } from '@reduxjs/toolkit';
import { createApiEndpoint, ENDPOINTS } from 'src/apiServices';

const initialState = {
  brands: [],
  page: 0,
  limit: 10,
  count: 0,
  loading: true,
  sortModel: [{field: 'Name', sort: 'asc'}],
  filters: {}
};

const slice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    getBrands(state, action) {
      state.brands = action.payload;
      state.brands.map((b) => b.id = b.Id);
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

export const getBrands = (state) => async (dispatch) => {
    dispatch(slice.actions.setLoading(true));

    const response = await createApiEndpoint(ENDPOINTS.BRAND).fetchAll(state.limit, state.page + 1, state.sortModel[0].field, state.sortModel[0].sort, state.filters);

    dispatch(slice.actions.getBrands(response.data.Data));
    dispatch(slice.actions.setCount(response.data.TotalRecords));
    dispatch(slice.actions.setLoading(false));
};

export const getBrandItem = async (id) => {
  const response = await createApiEndpoint(ENDPOINTS.BRAND).fetchById(id);
  return response.data.Brand;
};

export const getAllBrands = async () => {
  const response = await createApiEndpoint(ENDPOINTS.BRAND).All();
  return response.data.Brands;
};

export const searchBrands = (page, text, filters) => async () => {
  const response = await createApiEndpoint(ENDPOINTS.BRAND).Search(page, text, filters);
  return response.data.Brands;
};

export const createBrand = async (createData) => {
  await createApiEndpoint(ENDPOINTS.BRAND).create(createData);
};

export const updateBrand = async (id, updateData) => {
  await createApiEndpoint(ENDPOINTS.BRAND).update(id, updateData);
};

export const deleteBrand = (id) => async(dispatch) => {
  await createApiEndpoint(ENDPOINTS.BRAND).delete(id);
}

export const groupBrands = (verticals, brands) => {
  const groupedBrands = {}

  verticals.map((vertical) => {
    groupedBrands[vertical.Id] = []
    brands.map((brand) => {
      if(vertical.Id == brand.VerticalId){
        groupedBrands[vertical.Id].push({
          Id: brand.Id,
          Name: brand.Name
        })
      }
    })
  })

  return groupedBrands;
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
