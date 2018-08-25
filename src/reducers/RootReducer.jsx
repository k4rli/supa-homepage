import { combineReducers } from 'redux';
import trackingCodes from './TrackingReducer';
import requestResults from './RequestReducer';
import login from './LoginReducer';

const rootReducer = combineReducers({
    trackingCodes,
    requestResults,
    login
});

export default rootReducer;
