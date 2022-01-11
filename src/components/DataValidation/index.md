---
nav:
  title: '组件'
  order: 1
group:
  title: 组件
  order: 0
title: 数据校验
order: 1
---

## DataValidation

Demo:

```tsx
import React, { useRef } from 'react';
import { DataValidation } from '../../index';

export default () => {
  let dataValidationRef: DataValidation = useRef();

  return (
    <div>
      <DataValidation
        // columns={['skuCode', 'quantity', 'price']}
        columns={["skuCode", "quantity", "price"]}  // 需要哪些列展示，以及展示的顺序
          validDataUrl="http://test.i-baby.net/wms-ops/recordDetailImport/check" // 校验的接口url
        onRef={(ref) => {
          dataValidationRef = ref;
        }}
      />
    </div>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/demo-principle
