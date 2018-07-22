export const saveTrackingSearchResults = (data) => { return { type: 'TRACKING_API_SUCCESS', data } }

export const saveTrackingCodes = (codes) => { return { type: 'SAVE_TRACKING_CODES', codes } }

export const addNewTrackingCode = (code) => { return { type: 'ADD_NEW_TRACKING_CODE', code } }

export const resetResults = () => { return { type: 'RESET_API_RESULTS' } };
