---
nav:
  title: '工具方法'
  order: 2
group:
  title: 方法
  order: 0
title: 确保单用户登录
order: 1
---

## QueryMutipleInput

Demo:

```tsx
import React, { useRef } from 'react';
import { message } from 'antd';

import { CheckOneUser } from '../../index';

CheckOneUser('userInfo.a.information.name', 3, () => {
  message.warning('检测新用户登录，当前页面会在3s之后刷新!');
})

export default () => {
  
  const handleOnChange = (value) => {
    console.log(value);
  };

  return (
    <div>
    </div>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/demo-principle
