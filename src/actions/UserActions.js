export const saveTrackingSearchResults = data => ({ type: 'TRACKING_API_SUCCESS', data });

export const saveTrackingCodes = codes => ({ type: 'SAVE_TRACKING_CODES', codes });

export const addNewTrackingCode = code => ({ type: 'ADD_NEW_TRACKING_CODE', code });

export const resetResults = () => ({ type: 'RESET_API_RESULTS' });

export const signInWithOAuth = login => ({ type: 'OAUTH2_SIGN_IN', login });

export const saveCurrentAuthProvider = provider => ({ type: 'SAVE_OAUTH_PROVIDER', provider });

export const destroyOAuthSession = () => ({ type: 'DESTROY_OAUTH_SESSION' });
