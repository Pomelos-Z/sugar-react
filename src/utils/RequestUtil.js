import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000
})

instance.interceptors.response.use(
    function (respnse) {
        return respnse.data
    },
    function (error) {
        return error
    }
)

export function get(url, params) {
    return instance.get(url, {
        params
    })
}

export function post(url, data) {
    return instance.post(url, data)
}

export function put(url, data) {
    return instance.put(url, data)
}

export function del(url, data) {
    return instance.delete(url, data)
}