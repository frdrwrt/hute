<script>
  import { Header, HeaderUtilities, SkipToContent, HeaderActionLink } from 'carbon-components-svelte';

  /* eslint import/no-unresolved: "off" */
  import LogoGitHub20 from 'carbon-icons-svelte/lib/LogoGitHub20';

  export let isSideNavOpen;
</script>

<Header company="HUTE" platformName="Track your conditions" href="/" bind:isSideNavOpen>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <HeaderUtilities>
    <HeaderActionLink aria-label="GitHub" icon={LogoGitHub20} href="https://github.com/frdrwrt/hute" />
  </HeaderUtilities>
</Header>
