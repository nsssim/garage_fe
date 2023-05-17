<template>
  <v-app style="min-height:100vh;">
    <dashboard-core-app-bar />
    <dashboard-core-drawer />
    <dashboard-core-view />
    <dashboard-core-footer/>
  </v-app>
</template>

<script>

  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar'),
      DashboardCoreDrawer: () => import('./components/core/Drawer'),
      DashboardCoreView: () => import('./components/core/View'),
      DashboardCoreFooter: () => import('./components/core/Footer'),
    },

    data: () => ({
      BASE_URL:process.env.VUE_APP_BASE_URL,
      API_URL:process.env.VUE_APP_API_URL,

    }),
    mounted(){

    }
  }
</script>

<style>
.v-main.v-content{
  min-width: 100%;
  margin-bottom: 10px;
}

</style>
