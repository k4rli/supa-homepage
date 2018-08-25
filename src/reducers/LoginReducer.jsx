import initialState from './InitialState';

export default function login(state = initialState.userAccount, action) {
    switch (action.type) {
        case 'OAUTH2_SIGN_IN':
            return action.login;
        case 'SAVE_OAUTH_PROVIDER':
            return {
                ...state,
                provider: action.provider
            };
        case 'DESTROY_OAUTH_SESSION': // there is no actual session
            return {};
        default:
            return state;
    }
}
