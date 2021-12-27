/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-11-30 22:59:39
 * @LastEditTime: 2021-12-27 20:16:20
 * @LastEditors: rodchen
 */

import axios from 'axios';

const resposne = JSON.parse(localStorage.getItem('userInfo') || '{}');

axios.defaults.headers.common['sso-sessionid'] = resposne?.sessionId || '';

export { default as DataValidation } from './components/DataValidation';
export { default as QueryInput } from './components/QueryInput';
