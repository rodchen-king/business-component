/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2022-01-14 14:12:01
 * @LastEditTime: 2022-01-14 16:09:22
 * @LastEditors: rodchen
 */
export default (storageKeyString: string, seconds: number = 2, tipsCallFunction?: () =>{}) => {
  if (typeof seconds !== 'number' ) throw new Error('seconds should be number');
  
  let cacheValue = getStorageVale(storageKeyString);

  if (document.hidden !== undefined) {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        let currentValue = getStorageVale(storageKeyString);
        if (currentValue !== cacheValue) {
          if (tipsCallFunction && typeof tipsCallFunction === 'function') {
            tipsCallFunction();
          } else {
            window.alert('检测新用户登录，当前页面会在2s之后刷新!');
          }
  
          setTimeout(() => {
            window.location.reload();
          }, seconds * 1000)
        }
      }
    })
  }
}

function getStorageVale (storageKeyString: string) {
  var [localstorage, ...restKeyArrays] = storageKeyString.split('.');
  let localStorageInfo = window.localStorage.getItem(localstorage)

  if (!restKeyArrays.length) return localStorageInfo;

  let returnVal = JSON.parse(localStorageInfo || '{}');

  for(let i = 0; i < restKeyArrays.length; i++ ) {
    returnVal = returnVal[restKeyArrays[i]]

    if (typeof returnVal === 'string') {
      return returnVal
    }
  }

  return ""
}