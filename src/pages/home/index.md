---
title: "The Dropdown"
date: "2019-04-27"
slug: "/"
---

# Dropdown

import Dropdown from '@components/Dropdown/Dropdown';

<Dropdown of={<button>CLICK ME</button>}>
  {() => (
    <>
    <span>Option 1</span>
    <span>Option 2</span>
    <span>Option 3</span>
    <span>Option 4</span>
    <span>Option 5</span>
    </>
  )}
</Dropdown>

```jsx{1}
import Dropdown from '@components/Dropdown/Dropdown';

<Dropdown of={<button>CLICK ME</button>}>
  {() => (
    <>
    <span>Option 1</span>
    <span>Option 2</span>
    <span>Option 3</span>
    <span>Option 4</span>
    <span>Option 5</span>
    </>
  )}
</Dropdown>
```
