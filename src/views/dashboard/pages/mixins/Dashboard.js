export const DashboardMixin = {
  methods: {

    get_all_user(){
        this.loading = true;
        return new Promise((resolve,reject)=>{
        var post_config = {
          method: 'get',
          url: this.API_URL + "/list_users",
          headers:{
            'Content-Type': 'application/json',
            "x-access-token": localStorage.a_token_rfid,
            "x-refresh-token": localStorage.r_token_rfid
          },
        };
        this.axios(post_config)
        .then(response => {
          if(response.data == undefined)   reject("no response")
          if(response.status == 401){
            console.log('401 Auth!');
            this.users = [];
          }
          if (response.status == 200 && !response.data.a_token) {
            this.users = response.data.payload;
            this.loading = false;
          }else{
            localStorage.a_token_rfid = response.data.a_token
            localStorage.r_token_rfid = response.data.r_token
            this.get_all_user();
          }
          resolve(response.data)
        })
        .catch( error => {
          this.loading = false;
          reject(error)
          //this.$toast.error(this.$t("error_get"), {
            //  position: 'top-right',
          //})
          this.openNotification('top-right', 'danger', this.$t('user_info_getting_error'));

          if(error.response.status == 401){
            console.log('401 Auth!');
            this.devices = [];
          }
          else{
            console.log(error);
          }
          localStorage.r_token_rfid = ''
          localStorage.e_token_rfid = '';
          localStorage.a_token_rfid = ''
          this.$router.push('/login')
        });
      })
    },
  }
}
