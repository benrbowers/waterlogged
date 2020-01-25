function data(state = {}, action) {
    switch(action.type) {
        case 'GET_DATA_HAS_ERROR':
            return Object.assign({}, state, {
                getDataHasError: action.hasError,
            })
        case 'GET_DATA_IS_LOADING':
            return Object.assign({}, state, {
                getDataIsLoading: action.isLoading,
            })
        case 'GET_DATA_SUCCESS':
            return Object.assign({}, state, {
                getData: action.data,
        })
        default:
            return state
    }
}

export default data