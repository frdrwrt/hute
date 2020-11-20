<script>
  import {
    SideNav,
    SideNavItems,
    SideNavLink,
  } from "carbon-components-svelte";

  export let isSideNavOpen;
</script>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink text="Devices" href="/"/>
    <SideNavLink text="Create new device" href="/create-device"/>
  </SideNavItems>
</SideNav>
