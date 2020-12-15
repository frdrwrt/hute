<script>
  import { createEventDispatcher } from 'svelte';
  import { ContentSwitcher, Switch } from 'carbon-components-svelte';

  const dispatch = createEventDispatcher();
  let index = 3;

  const onChange = (event) => {
    let days;
    switch (event.detail) {
      case 0:
        days = 30;
        break;
      case 1:
        days = 7;
        break;
      case 2:
        days = 3;
        break;
      case 3:
        days = 1;
        break;
      default:
    }
    dispatch('change', days);
  };
</script>

<ContentSwitcher bind:selectedIndex={index} on:change={onChange}>
  <Switch text="30 days" />
  <Switch text="7 days" />
  <Switch text="3 days" />
  <Switch text="24h" />
</ContentSwitcher>
