<style lang="css" global>
@import 'carbon-components-svelte/css/g90';
:global(.bx--side-nav ~ .bx--content) {
  margin-left: 0;
}
</style>

<script>
import SideNav from '../components/shell/SideNav.svelte';
import Header from '../components/shell/Header.svelte';
import { Content } from 'carbon-components-svelte';
import { startApolloConnection } from '../connection.js';

startApolloConnection();

let isSideNavOpen = false;
</script>

<Header bind:isSideNavOpen />
<SideNav bind:isSideNavOpen />

<Content style="background: none; padding: 1rem">
  <slot />
</Content>
