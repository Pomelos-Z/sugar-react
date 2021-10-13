import {get, post, put, del} from '../utils/RequestUtil'

export function getIncomePage(page, rows) {
    return get('/incomes', {
        page: page,
        rows: rows
    });
}

export function insertIncome(data) {
    return post('/incomes', data)
}

export function updateIncome(id, data) {
    return put(`/incomes/${id}`, data)
}

export function deleteIncome(id) {
    return del(`/incomes/${id}`)
}

