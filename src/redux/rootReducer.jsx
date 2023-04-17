import { combineReducers } from 'redux';
import categoryReducer from './reducers/categoryReducer';
import commonReducer from './reducers/commonReducer';
import manufacturerReducer from './reducers/ManufacturerReducer';

const rootReducer = combineReducers({
    categoryReducer: categoryReducer,
    commonReducer,
    manufacturerReducer,
});

export default rootReducer;
