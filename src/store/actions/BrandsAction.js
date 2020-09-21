import {
    STORE_BRANDS,
} from '../constants/Brands';


function StoreBrands(Brands) {
    return {
        type: STORE_BRANDS,
        payload: { Brands },
    };
}


export { StoreBrands };
