<script>
  import { SideNav, SideNavItems, SideNavLink } from 'carbon-components-svelte';
  import { isMobile } from '../../stores';

  export let isSideNavOpen;

  const handleSelected = () => {
    console.log('isMobile', $isMobile);
    if ($isMobile) {
      isSideNavOpen = false;
    }
  };
</script>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink on:click={handleSelected} text="Devices" href="/" />
    <SideNavLink on:click={handleSelected} text="Create new device" href="/device/edit/create" />
  </SideNavItems>
</SideNav>
