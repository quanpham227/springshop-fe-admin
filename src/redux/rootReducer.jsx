import { combineReducers } from 'redux';
import categoryReducer from './reducers/categoryReducer';
import commonReducer from './reducers/commonReducer';
import manufacturerReducer from './reducers/ManufacturerReducer';
import productReducer from './reducers/productReducer';

const rootReducer = combineReducers({
    categoryReducer: categoryReducer,
    commonReducer,
    manufacturerReducer,
    productReducer,
});

export default rootReducer;
