function auth(state = {}, action) {
    switch(action.type) {
        case 'LOG_IN': 
            return Object.assign({}, state, {
                loggedIn: true,
                data: action.user,
            })
        case 'LOG_OUT':
            return Object.assign({}, state, {
                loggedIn: false,
                data: false,
            })
        case 'SET_TOKEN':
            return Object.assign({}, state, {
                token: action.token,
            })
        case 'UPDATE_TOKEN_HAS_ERROR':
            return Object.assign({}, state, {
                updateTokenHasError: action.hasError,
            })
        case 'UPDATE_TOKEN_IS_LOADING':
            return Object.assign({}, state, {
                updateTokenIsLoading: action.isLoading,
            })
        case 'UPDATE_TOKEN_SUCCESS':
            return Object.assign({}, state, {
                updateToken: action.data,
        })
        default:
            return state
    }
}

export default auth