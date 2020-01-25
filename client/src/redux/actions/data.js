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