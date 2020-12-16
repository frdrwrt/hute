<script>
  import { Header, HeaderUtilities, SkipToContent, HeaderGlobalAction } from 'carbon-components-svelte';
  import LogoGithub20 from 'carbon-icons-svelte/lib/LogoGithub20';

  import { goto } from '@sapper/app';

  export let isSideNavOpen;
  const handleGithub = async () => {
    await goto('https://github.com/frdrwrt/hute');
  };
</script>

<Header company="HUTE" platformName="Track your conditions" href="/" bind:isSideNavOpen>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <HeaderUtilities>
    <HeaderGlobalAction icon={LogoGithub20} on:click={handleGithub} />
  </HeaderUtilities>
</Header>
