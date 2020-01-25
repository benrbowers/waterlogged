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