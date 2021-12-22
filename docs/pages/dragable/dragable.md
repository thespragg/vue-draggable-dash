# Dragable

The button component is a simple customizable button.

| Prop       | Description               | Accepted Values                 | Default     |
| :--------- | :------------------------ | :------------------------------ | :---------- |
| `groups`   | Accepted drop groups      | -                               | `[]`        |

| Event   | Description               | Parameters    |
| :------ | :------------------------ | :------------ |
| `drop`  | Triggered on drop         | `$dropEvent`  |

```vue
<div style="margin-bottom: 16px">
  <div style="margin-bottom: 16px">
    <dragable>
      <p>Hi! I'm dragable</p>
    </dragable>
  </div>
</div>
```
<DragableExample />

<script setup>
import DragableExample from './DragableExample.vue'
</script>
