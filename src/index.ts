/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-11-30 22:59:39
 * @LastEditTime: 2021-12-29 17:43:01
 * @LastEditors: rodchen
 */

import axios from 'axios';

const resposne = JSON.parse(localStorage.getItem('userInfo') || '{}');

axios.defaults.headers.common['sso-sessionid'] = resposne?.sessionId || '';

export { default as DataValidation } from './components/DataValidation';
export { default as QueryMutipleInput } from './components/QueryMutipleInput';
