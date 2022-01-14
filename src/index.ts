/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-11-30 22:59:39
 * @LastEditTime: 2022-01-14 16:10:27
 * @LastEditors: rodchen
 */

import axios from 'axios';

const resposne = JSON.parse(localStorage.getItem('userInfo') || '{}');

axios.defaults.headers.common['sso-sessionid'] = resposne?.sessionId || '';

export { default as DataValidation } from './components/DataValidation';
export { default as QueryMutipleInput } from './components/QueryMutipleInput';
export { default as CheckOneUser } from './utils/CheckOneUser';

