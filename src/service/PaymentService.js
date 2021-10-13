import {get, post, put, del} from '../utils/RequestUtil'

export function getPaymentPage(page, rows) {
    return get('/payments', {
        page: page,
        rows: rows
    });
}

export function insertPayment(data) {
    return post('/payments', data)
}

export function updatePayment(id, data) {
    return put(`/payments/${id}`, data)
}

export function deletePayment(id) {
    return del(`/payments/${id}`)
}

