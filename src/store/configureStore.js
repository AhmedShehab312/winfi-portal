import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import ProfileReducer from './reducers/ProfileReducer';
import BrandsReducer from './reducers/BrandsReducer';

const storageReducer = combineReducers({
    ProfileState: ProfileReducer,
    BrandsState: BrandsReducer
});


const configureStore = createStore(storageReducer, applyMiddleware(thunk));

export { configureStore };
