<script>
   import {
     Header,
    HeaderUtilities,
    HeaderGlobalAction,
    SkipToContent,
  } from "carbon-components-svelte";
  import UserAvatar20 from "carbon-icons-svelte/lib/UserAvatar20";

  export let isSideNavOpen
</script>


<Header company="HUTE" platformName="Track your conditions" href="/" bind:isSideNavOpen>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <HeaderUtilities>
    <HeaderGlobalAction aria-label="User Avatar" icon="{UserAvatar20}" />
  </HeaderUtilities>
</Header>