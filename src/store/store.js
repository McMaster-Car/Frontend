import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './products/productsSlice';
import attributeReducer from './Attributes/attributeSlice';
import categoryReducer from './Categories/categorySlice';



const store = configureStore({
  reducer: {
    products: productsReducer,
    attributes : attributeReducer,
    categories : categoryReducer
  }
});

export default store;
