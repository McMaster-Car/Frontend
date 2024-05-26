import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Api/Connection/Connect';


export const fetchAttributes = createAsyncThunk(
  'attributes/fetchAttributes',
  async () => {
    try {
        const response = await Axios.get('/attributes/view-attributes')
        return response.data
    } catch (error) {
        return error.response.data
    }
  }
);

const attributesSlice = createSlice({
  name: 'attributes',
  initialState: {
    attributes: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttributes.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchAttributes.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.attributes = action.payload;
      })
      .addCase(fetchAttributes.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export const selectattributes = (state) => state.attributes.attributes;

export default attributesSlice.reducer;
