/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-11-30 22:59:39
 * @LastEditTime: 2021-12-08 16:50:04
 * @LastEditors: rodchen
 */

import axios from 'axios';

const resposne = JSON.parse(localStorage.getItem('userInfo') || '{}');

axios.defaults.headers.common['sso-sessionid'] = resposne?.sessionId || '';

export { default as DataValidation } from './DataValidation';
