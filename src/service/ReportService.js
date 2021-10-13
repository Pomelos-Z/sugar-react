import {get} from '../utils/RequestUtil'

export function getIncomeReport() {
    return get('/incomes/report', {});
}

export function getPaymentReport() {
    return get('/payments/report', {});
}
