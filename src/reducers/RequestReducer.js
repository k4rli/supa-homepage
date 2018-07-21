import initialState from './InitialState';

export default function requestResult(state = initialState.results, action) {
    switch (action.type) {
        case 'TRACKING_API_SUCCESS':
            console.log('Saving search results to state');
            return action.data;
        case 'TRACKING_API_FAILURE':
            return action.data;
        case 'RESET_API_RESULTS':
            return initialState.results;
        default:
            return state;
    }
};
