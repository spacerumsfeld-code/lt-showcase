import axios, { type RawAxiosRequestHeaders, type ResponseType } from 'axios'

export interface RequestArgs<T = object> {
    url: string
    headers: RawAxiosRequestHeaders
    params?: object
    body?: T
    responseType?: ResponseType
    timeout?: number
}

const get = async <T>(args: RequestArgs): Promise<T | null> => {
    const { data, status } = await axios.get(args.url, {
        headers: args.headers,
        params: args.params,
        timeout: args.timeout,
        responseType: args.responseType,
    })

    if (status === 204) {
        return null
    }

    return data
}

const post = async <T>(args: RequestArgs): Promise<T> => {
    const { data } = await axios.post<T>(args.url, args.body, {
        headers: args.headers,
        params: args.params,
        timeout: args.timeout,
        responseType: args.responseType,
    })

    return data
}

const put = async <T>(args: RequestArgs): Promise<T> => {
    const { data } = await axios.put<T>(args.url, args.body, {
        headers: args.headers,
        params: args.params,
        timeout: args.timeout,
        responseType: args.responseType,
    })

    return data
}

const patch = async <T>(args: RequestArgs): Promise<T> => {
    const { data } = await axios.patch<T>(args.url, args.body, {
        headers: args.headers,
        params: args.params,
        timeout: args.timeout,
        responseType: args.responseType,
    })

    return data
}

const deleteRequest = async <T>(args: RequestArgs): Promise<T> => {
    const { data } = await axios.delete<T>(args.url, {
        headers: args.headers,
        params: args.params,
        timeout: args.timeout,
        responseType: args.responseType,
    })

    return data
}

const restClient = {
    get,
    post,
    put,
    patch,
    delete: deleteRequest,
}

export { restClient }
