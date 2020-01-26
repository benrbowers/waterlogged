import genericDispatch from './fetch'

export function getDataHasError(hasError) {
    return {
        type: 'GET_DATA_HAS_ERROR',
        hasError
    }
}

export function getDataIsLoading(isLoading) {
    return {
        type: 'GET_DATA_IS_LOADING',
        isLoading
    }
}

export function getDataSuccess(data) {
    return {
        type: 'GET_DATA_SUCCESS',
        data
    }
}

export const getData = genericDispatch(
    getDataHasError, getDataIsLoading, getDataSuccess, 'GET'
)

export function addTrackerHasError(hasError) {
    return {
        type: 'ADD_TRACKER_HAS_ERROR',
        hasError
    }
}

export function addTrackerIsLoading(isLoading) {
    return {
        type: 'ADD_TRACKER_IS_LOADING',
        isLoading
    }
}

export function addTrackerSuccess(data) {
    return {
        type: 'ADD_TRACKER_SUCCESS',
        data
    }
}

export const addTracker = genericDispatch(
    addTrackerHasError, addTrackerIsLoading, addTrackerSuccess, 'POST'
)