import { combineReducers } from 'redux';
import tracking from './TrackingReducer';

const rootReducer = combineReducers({
    tracking
});

export default rootReducer;