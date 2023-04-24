import {
    PRODUCTS_SET,
    PRODUCT_APPEND,
    PRODUCT_DELETE,
    PRODUCT_SET,
    PRODUCT_SET_PAGEABLE,
    PRODUCT_STATE_CLEAR,
    PRODUCT_UPDATE,
} from '../actions/actionTypes';

const initialState = {
    product: {},
    products: [],
    pagination: {
        size: 5,
        page: 0,
        totalElements: 0,
        query: '',
        totalPage: 1,
    },
};

const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PRODUCT_SET:
            return { ...state, product: payload };
        case PRODUCTS_SET:
            return { ...state, products: payload };
        case PRODUCT_APPEND:
            return { ...state, products: [payload, ...state.products] };
        case PRODUCT_SET_PAGEABLE:
            return { ...state, pagination: payload };
        case PRODUCT_DELETE:
            return {
                ...state,
                products: state.products.filter((item) => item.id !== payload),
            };
        case PRODUCT_UPDATE:
            const newProducts = state.products.filter((item) => item.id !== payload.id);
            return {
                ...state,
                products: [payload, ...newProducts],
            };
        case PRODUCT_STATE_CLEAR:
            return {
                product: {},
                products: [],
            };
        default:
            return state;
    }
};
export default productReducer;
