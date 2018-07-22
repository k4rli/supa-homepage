import initialState from './InitialState';
import htmlToJson from '../components/htmltojson';

export default function requestResult(state = initialState.results, action) {
    switch (action.type) {
        case 'TRACKING_API_SUCCESS':
            console.log('Saving search results to state');
            const converted = htmlToJson(action.data);
            return {
                headers: converted[0],
                rows: converted[1]
            };
        case 'TRACKING_API_FAILURE':
            return action.data;
        case 'RESET_API_RESULTS':
            return initialState.results;
        default:
            return state;
    }
};
