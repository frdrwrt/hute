<script>
  import { Link } from "svelte-routing";
  import {
    SideNav,
    SideNavItems,
    SideNavLink,
  } from "carbon-components-svelte";

  export let isSideNavOpen;
</script>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <Link to="/devices">
    <SideNavLink text="Devices"/>
    </Link>
    <Link to="/graphs">
    <SideNavLink text="Graphs" />
    </Link>
  </SideNavItems>
</SideNav>
