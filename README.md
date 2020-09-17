# Vue Full Page Horizontal Scroller

## How to install

### npm

```bash
$ npm install vue-fullpage-horz-scroller --save
```

## Quick start

### Vue.js

You can import in your `main.js` file

```js
import Vue from "vue";
import { VueFullPageHorzScroller } from "vue-fullpage-horz-scroller";

Vue.use(VueFullPageHorzScroller);
```

Or locally in any component

```js
import { VueFullPageHorzScroller } from "vue-fullpage-horz-scroller";

export default {
  components: {
    VueFullPageHorzScroller
  }
};
```

## Usage

```html
<template>
  <VueFullPageHorzScroller :slides="slides" />
</template>

...

<script>
  export default {
    ...
    data: () => ({
      slides: [
        {
          imageURL: "https://images.pexels.com/photos/1459347/pexels-photo-1459347.jpeg",
        },
        {
          imageURL: "https://images.pexels.com/photos/3709434/pexels-photo-3709434.jpeg",
        },
        {
          imageURL: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg",
        },
        {
          imageURL: "https://images.pexels.com/photos/763097/pexels-photo-763097.jpeg",
        },
        {
          imageURL: "https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg",
        }
      ],
    }),
  };
</script>
```

### TODO

- More Prop Options (styling, menu placement etc)
- Bug Fixes
