import initialState from './InitialState';

export default function trackingCodes(state = initialState.trackingCodes, action) {
    switch (action.type) {
        case 'ADD_NEW_TRACKING_CODE':
            console.log("new code")
        default:
            return state;
    }
};