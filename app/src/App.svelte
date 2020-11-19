<script>
import { Router, Link, Route } from 'svelte-routing';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setClient } from 'svelte-apollo';

// import Theme from './components/Theme.svelte';
import SideNav from './components/shell/SideNav.svelte';
import Header from './components/shell/Header.svelte';
import Devices from './pages/Devices.svelte';
import Graphs from './pages/Devices.svelte';
import { Content } from 'carbon-components-svelte';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});
setClient(client);

let isSideNavOpen = false;
export let url = '';
let theme = 'g90';
</script>

<style lang="css" global>
  @import "carbon-components-svelte/css/g90";
</style>

<Router url="{url}">
  <!-- <Theme persist bind:theme> -->
    <Header bind:isSideNavOpen />
    <SideNav bind:isSideNavOpen />

    <Content style="background: none; padding: 1rem">
      <Route path="devices" component="{Devices}" />
      <Route path="graphs" component="{Graphs}" />
      <Route path="/" component="{Devices}" />
    </Content>
  <!-- </Theme> -->
</Router>
