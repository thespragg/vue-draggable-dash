# Dragable

| Prop       | Description                                        | Accepted Values                 | Default     |
| :--------- | :------------------------------------------------- | :------------------------------ | :---------- |
| `element`  | What HTML element the dragable should be           | -                               | `div`       |
| `data`     | Object to be passed with the drag/drop operation   | -                               | `null`      |
| `groups`   | Accepted drop groups                               | -                               | `[]`        |

```vue
  <div>
    <dragable>
      <p>Hi! I'm a dragable component</p>
    </dragable>
  </div>
```

## Example

<span style="color:red;">NOTE: Dragable component has no default styling, styles added for documentation purposes.</span>
<DragableExample style="margin-top:20px"/>

<script setup>
import DragableExample from './DragableExample.vue'
</script>