---
nav:
  title: Components
  path: /components
---

## DataValidation

Demo:

```tsx
import React, { useRef } from 'react';
import { DataValidation } from '../index';

export default () => {
  let dataValidationRef: DataValidation = useRef();

  return (
    <div>
      <DataValidation
        columns={['skuCode', 'quantity', 'price']}
        onRef={(ref) => {
          dataValidationRef = ref;
        }}
      />
    </div>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/demo-principle
