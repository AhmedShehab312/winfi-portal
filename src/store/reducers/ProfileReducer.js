import {
    STORE_PROFILE,
} from '../constants/Profile';

const initialState = {
    OwnerProfile: null,
};

const ProfileReducer = (state = initialState, action) => {
    if (action.type === STORE_PROFILE) {
        return {
            ...state,
            OwnerProfile: action.payload.Profile,
        };
    }
    return state;
};

export default ProfileReducer;
