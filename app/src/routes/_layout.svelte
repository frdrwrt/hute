<style global>
/* Why do we need important here find a better solution. */
@media (max-width: 1056px) {
  :global(.bx--side-nav ~ .bx--content) {
    margin-left: 0 !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  :global(.bx--side-nav--expanded ~ .bx--content) {
    white-space: nowrap !important;
    min-width: 28rem !important;
  }
}
:global(.bx--btn--danger-ghost .bx--btn__icon) {
  /* not a nice solution, fixed delete button to be square */
  margin-left: 0 !important;
}
</style>

<svelte:head>
  <title>HUTE</title>
</svelte:head>


<script>
import SideNav from '../components/shell/SideNav.svelte';
import Header from '../components/shell/Header.svelte';
import { Content } from 'carbon-components-svelte';
import { startApolloConnection } from '../connection.js';
import { isMobile } from '../stores';

startApolloConnection();

let width;
let height;

$: {isMobile.set(width < 1056)};

let isSideNavOpen = false;
</script>

<svelte:window bind:innerWidth="{width}" bind:innerHeight="{height}" />
<Header bind:isSideNavOpen />
<SideNav bind:isSideNavOpen />

<Content style="background: none; padding: 1rem">
  <slot />
</Content>
