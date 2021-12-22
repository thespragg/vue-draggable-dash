# Dropable

| Prop       | Description                                        | Accepted Values                 | Default     |
| :--------- | :------------------------------------------------- | :------------------------------ | :---------- |
| `element`  | What HTML element the dragable should be           | -                               | `div`       |
| `groups`   | Accepted drop groups                               | -                               | `[]`        |

```vue
  <div>
    <dropable>
        // Dragables can be dropped here
    </dropable>
  </div>
```

## Example

<span style="color:red;">NOTE: Dropable component has no default styling, styles added for documentation purposes.</span>
<DropableExample style="margin-top:20px"/>

<script setup>
import DropableExample from './DropableExample.vue'
</script>