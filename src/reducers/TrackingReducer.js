import initialState from './InitialState';

export default function trackingCodes(state = initialState.trackingCodes, action) {
    switch (action.type) {
        case 'ADD_NEW_TRACKING_CODE':
            console.log('Adding new tracking code to state.')
            if (action.code.label.length === 0) {
                action.code.label = `Package no: ${state.length + 1}`;
            }
            console.log(state);
            console.log(action.code);
            return [...state, action.code];
        case 'SAVE_TRACKING_CODES':
            console.log('Saving tracking codes to state.')
            return [...action.codes];
        default:
            return state;
    }
};
