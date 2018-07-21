import { combineReducers } from 'redux';
import trackingCodes from './TrackingReducer';
import requestResults from './RequestReducer';

const rootReducer = combineReducers({
    trackingCodes,
    requestResults
});

export default rootReducer;