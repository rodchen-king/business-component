---
nav:
  title: '组件'
  order: 1
group:
  title: 组件
  order: 0
title: 批量查询组件
order: 1
---

## QueryMutipleInput

Demo:

```tsx
import React, { useRef } from 'react';
import { QueryMutipleInput } from '../../index';

export default () => {
  const handleOnChange = (value) => {
    console.log(value);
  };

  return (
    <div>
      <QueryMutipleInput onValueChange={handleOnChange} />
    </div>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/demo-principle
