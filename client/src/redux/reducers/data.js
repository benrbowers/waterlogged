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
        case 'COMPUTE_DATA':
        case 'GET_DATA_SUCCESS':
            return Object.assign({}, state, {
                getData: action.data,
        })
        case 'ADD_TRACKER_HAS_ERROR':
            return Object.assign({}, state, {
                addTrackerHasError: action.hasError,
            })
        case 'ADD_TRACKER_IS_LOADING':
            return Object.assign({}, state, {
                addTrackerIsLoading: action.isLoading,
            })
        case 'ADD_TRACKER_SUCCESS':
            return Object.assign({}, state, {
                addTracker: action.data,
        })
        default:
            return state
    }
}

export default data