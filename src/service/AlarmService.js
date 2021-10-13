import {get, post, put, del} from '../utils/RequestUtil'

export function getAlarmPage(page, rows) {
    return get('/alarms', {
        page: page,
        rows: rows
    });
}

export function insertAlarm(data) {
    return post('/alarms', data)
}

export function updateAlarm(id, data) {
    return put(`/alarms/${id}`, data)
}

export function deleteAlarm(id) {
    return del(`/alarms/${id}`)
}

