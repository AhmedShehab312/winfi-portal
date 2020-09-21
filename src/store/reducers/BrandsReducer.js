import {
    STORE_BRANDS,
} from '../constants/Brands';

const initialState = {
    Brands: {},
};

const BrandsReducer = (state = initialState, action) => {
    if (action.type === STORE_BRANDS) {
        return {
            ...state,
            Brands: action.payload.Brands,
        };
    }
    return state;
};

export default BrandsReducer;
