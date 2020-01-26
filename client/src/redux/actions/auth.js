import genericDispatch from './fetch'

export function logIn(user) {
    return {
        type: 'LOG_IN',
        user
    }
}

export function logOut() {
    return {
        type: 'LOG_OUT'
    }
}

export function setToken(token) {
    return {
        type: 'SET_TOKEN',
        token
    }
}

export function updateTokenHasError(hasError) {
    return {
        type: 'UPDATE_TOKEN_HAS_ERROR',
        hasError
    }
}

export function updateTokenIsLoading(isLoading) {
    return {
        type: 'UPDATE_TOKEN_IS_LOADING',
        isLoading
    }
}

export function updateTokenSuccess(data) {
    return {
        type: 'UPDATE_TOKEN_SUCCESS',
        data
    }
}

export const updateToken = genericDispatch(
    updateTokenHasError, updateTokenIsLoading, updateTokenSuccess, 'POST'
)