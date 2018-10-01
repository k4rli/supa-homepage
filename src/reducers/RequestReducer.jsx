import initialState from './InitialState';
import htmlToJson from '../helpers/htmltojson';

export default function requestResult(state = initialState.results, action) {
    switch (action.type) {
        case 'TRACKING_API_SUCCESS':
            if (process.env.NODE_ENV === 'development') {
                console.log('Saving search results to state');
            }
            const { data } = action;
            const converted = htmlToJson(data);
            return converted === undefined
                ? {}
                : (
                    {
                        headers: converted[0],
                        rows: converted[1]
                    }
                );
        case 'TRACKING_API_FAILURE':
            return action.data;
        case 'RESET_API_RESULTS':
            return initialState.results;
        default:
            return state;
    }
}
