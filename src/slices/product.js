import { createSlice } from '@reduxjs/toolkit';
import { createApiEndpoint, ENDPOINTS } from 'src/apiServices';

const initialState = {
  products: [],
  page: 0,
  limit: 10,
  count: 0,
  loading: true,
  sortModel: [{field: 'Name', sort: 'asc'}]
};

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts(state, action) {
      state.products = action.payload;
      state.products.map((b) => b.id = b.Id);
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

export const getProducts = (state) => async (dispatch) => {
    const response = await createApiEndpoint(ENDPOINTS.PRODUCT).fetchAll(state.limit, state.page + 1, state.sortModel[0].field, state.sortModel[0].sort, state.filters);

    dispatch(slice.actions.getProducts(response.data.Data));
    dispatch(slice.actions.setCount(response.data.TotalRecords));
    dispatch(slice.actions.setLoading(false));
};

export const getProductItem = async (id) => {
  const response = await createApiEndpoint(ENDPOINTS.PRODUCT).fetchById(id);
  return response.data.Product;
};

export const getAllProducts = async () => {
  const response = await createApiEndpoint(ENDPOINTS.PRODUCT).All();
  return response.data.Products;
};

export const searchProducts = async (page, text, filters) => {
  const response = await createApiEndpoint(ENDPOINTS.PRODUCT).Search(page, text, filters);
  return response.data.Products;
};

export const createProduct = async (createData) => {
  await createApiEndpoint(ENDPOINTS.PRODUCT).create(createData);
};

export const updateProduct = async (id, updateData) => {
  await createApiEndpoint(ENDPOINTS.PRODUCT).update(id, updateData);
};

export const deleteProduct = (id) => async(dispatch) => {
  dispatch(slice.actions.setLoading(true));
  await createApiEndpoint(ENDPOINTS.PRODUCT).delete(id);
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
};;

export default slice;
