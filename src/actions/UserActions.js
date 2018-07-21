export function saveTrackingSearchResults(data) {
    return {
        type: 'TRACKING_API_SUCCESS',
        data
    }
}

export function saveTrackingCodes(codes) {
    return {
        type: 'SAVE_TRACKING_CODES',
        codes
    }
}

export function addNewTrackingCode(code) {
    return {
        type: 'ADD_NEW_TRACKING_CODE',
        code
    }
}

export function resetResults() {
    return {
        type: 'RESET_API_RESULTS'
    }
}
