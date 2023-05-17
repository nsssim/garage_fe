<template>
  <body>
    <div class="limiter" />
  </body>
</template>

<script>
  export default {
    name: 'Logout',

    data: () => ({
      BASE_URL: process.env.VUE_APP_BASE_URL,
      API_URL: process.env.VUE_APP_API_URL,
    }),

    beforeMount () {
      if (localStorage.r_token_rfid) {
        localStorage.r_token_rfid = ''
      }
      if (localStorage.a_token_rfid) {
        localStorage.a_token_rfid = ''
      }
      localStorage.r_token_rfid = ''
      localStorage.e_token_rfid = '';
      localStorage.a_token_rfid = ''
      this.$router.push('/super/login')
    },
  }
</script>
