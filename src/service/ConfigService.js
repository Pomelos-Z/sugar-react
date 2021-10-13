import {get, post, put, del} from '../utils/RequestUtil'

export function getConfigPage(page, rows, type) {
    return get('/configs', {
        page: page,
        rows: rows,
        type: type
    });
}

export function insertConfig(data) {
    return post('/configs', data)
}

export function updateConfig(id, data) {
    return put(`/configs/${id}`, data)
}

export function deleteConfig(id) {
    return del(`/configs/${id}`)
}

