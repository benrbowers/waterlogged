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
        default:
            return state
    }
}

export default auth