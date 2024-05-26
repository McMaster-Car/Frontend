import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories } from '../../Api/Category/getCategories';


export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const data = await getCategories();
    return data;
  }
);

const CategoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export const selectCategories = (state) => state.categories.categories;

export default CategoriesSlice.reducer;
