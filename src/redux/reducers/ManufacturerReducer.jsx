import {
    MANUFACTURERS_SET,
    MANUFACTURER_DELETE,
    MANUFACTURER_SET,
    MANUFACTURER_STATE_CLEAR,
} from '../actions/actionTypes';

const initialState = {
    manufacturer: {},
    manufacturers: [],
};

const manufacturerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case MANUFACTURER_SET:
            return { ...state, manufacturer: payload };
        case MANUFACTURERS_SET:
            return { ...state, manufacturers: payload };
        case MANUFACTURER_DELETE:
            return {
                ...state,
                manufacturers: state.manufacturers.filter((item) => item.id !== payload),
            };
        case MANUFACTURER_STATE_CLEAR:
            return {
                category: {},
                categories: [],
            };
        default:
            return state;
    }
};
export default manufacturerReducer;
