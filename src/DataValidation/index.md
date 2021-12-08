---
nav:
  title: Components
  path: /components
---

## DataValidation

Demo:

```tsx
import React from 'react';
import { DataValidation } from '../index';

export default () => (
  <div>
    <DataValidation
      columns={[
        ['商品编码', 'skuCode'],
        ['商品名称', 'skuName'],
        ['商品名称1', 'skuName'],
      ]}
      validDataFunction={(data, resolve) => {
        resolve([]);
      }}
      title="商品录入"
    />
  </div>
);
```

More skills for writing demo: https://d.umijs.org/guide/demo-principle
