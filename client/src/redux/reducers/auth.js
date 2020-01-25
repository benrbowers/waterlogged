function auth(state = {}, action) {
    switch(action.type) {
        case 'LOG_IN': 
            return Object.assign({}, state, {
                loggedIn: true,
            })
        case 'LOG_OUT':
            return Object.assign({}, state, {
                loggedIn: false,
            })
        case 'SET_TOKEN':
            return Object.assign({}, state, {
                token: action.token,
            })
        default:
            return state
    }
}

export default auth