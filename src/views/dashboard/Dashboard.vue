<template>
<div style="height:100%; display:flex; align-items:center; justify-content:">
   <v-row >
    <v-col >
      <v-card
    class="mx-auto  rounded-xl"
    max-width="344"
  >
    <v-card-text  class="home-cards">
      <b style="height: 40%">{{_T('users_count')}}</b>

      <p>adjective</p>

    </v-card-text>


  </v-card>
    </v-col>
    <v-col>
      <v-card
    class="mx-auto rounded-xl"

    max-width="344"
  >
    <v-card-text class="home-cards">
      <b style="height: 40%">{{_T('devices')}}</b>

      <p>adjective</p>
      <p>adjective</p>

    </v-card-text>


  </v-card>
    </v-col>
    <v-col>
      <v-card
    class="mx-auto  rounded-xl"
    max-width="344"
  >
    <v-card-text class="home-cards">
      <b style="height: 40%">{{_T('account')}}</b>

      <p>adjective</p>
      <p>adjective</p>

    </v-card-text>


  </v-card>
    </v-col>
  </v-row>
</div>




</template>
<script>
  import "../../../src/assets/loginpage/vendor/bootstrap/css/bootstrap.min.css";
  import { DashboardMixin } from './pages/mixins/Dashboard'
  import { CommonMixin } from './pages/mixins/Common'
  import 'sweetalert2/dist/sweetalert2.min.css';
  import 'vue-toast-notification/dist/theme-sugar.css';
  import { required, maxLength, minLength, email, numeric, helpers } from 'vuelidate/lib/validators'
  import { vsButton, vsSelect, vsPopup } from 'vuesax'
  import 'vuesax/dist/vuesax.css'



  const alphaNumAndDotValidator = helpers.regex('alphaNumAndDot', /^[a-z\d]*$/i);

  export default {
    name: 'Dashboard',
    mixins: [CommonMixin,DashboardMixin],
    validations : {
        rfid_number : { required,numeric,minLength:minLength(5),maxLength:maxLength(15) },
    },

    data () {
      return {
        BASE_URL:process.env.VUE_APP_BASE_URL,
        API_URL:process.env.VUE_APP_API_URL,

        loading : false,
      }
    },

    computed: {

      rfidErrors () {
        const errors = []
        if (!this.$v.rfid_number.$dirty) return errors
        !this.$v.rfid_number.required && errors.push(this.$t('rfid_require'))
        !this.$v.rfid_number.numeric && errors.push(this.$t('rfid_validate'))
        !this.$v.rfid_number.minLength && errors.push(this.$t('rfid_length'))
        !this.$v.rfid_number.maxLength && errors.push(this.$t('rfid_length'))
        if (errors != "") {
          this.saveButton = true
        }else{
          this.saveButton = false
        }
        return errors
      },

      _T() { return this.$t },
      headers_all_devices(){
          let tbl_headers =  [

          {

            sortable: true,
            text: "RFID",
            value: 'rfid',
            align : 'center',
            width: '10vw'
          },

          {
            sortable: true,
            text: this.$t('user_code'),
            value: 'user_code',
            align: 'center',
          },
          {
            sortable: true,
            text: this.$t('status'),
            value: 'status',
            align: 'center',
            width:'20vw'
          },
          { text: this.$t('action'),width : "30", value: "actions", align:"center", sortable: false }

        ]
        return tbl_headers ;
      },

    },

    methods : {
      async main(){

      },
      startDownload(){
        this.loaderFlag=1;
      },
      finishDownload(){
        this.loaderFlag=0;
      }
    },
    watch : { },


    async mounted()
    {
      await this.check_token()
      // this.get_all_user();
    },
    created(){


    }
  }
</script>


<style scoped>
.v-main__wrap section {
  max-width: 93%;
}
.text-h3 {
  margin-top: 0px !important;
  font-weight: 500;
  font-size: 30px !important;
}
.v-menu__content{
  top : 280px !important
}
.loader {
  border: 8px solid #111010;
  border-radius: 50%;
  border-top: 8px solid rgb(255, 255, 255);
  border-right: 8px solid rgb(8, 8, 8);
  border-bottom: 8px solid rgb(252, 246, 246);
  width: 5px;
  height: 5px;
  margin-left: 5px;
  margin-top: 2px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>


<style>
.vs-notification__content__header h4{
  font-size: 15px !important;
  font-weight: 700;
}
.vs-notification__content__text p{
  font-size: 13px !important;
}
.v-chip .v-chip__content{
  font-size : 15px !important;
}

.v-list-item:hover{
     box-shadow: inset 15vw 0 0 0 #bfc5c7;
      color: white;
    opacity: 0.9;
    cursor: pointer;
}

.v-card .v-card--material__heading .display-2 {
    font-size: 18px !important;
    color: #fff;

}

.v-icon.v-icon {
    font-size: 20px;
    color: #000;
}

/* .v-alert .v-alert__wrapper .v-alert__content {
    font-weight: 300;
    color: #fff;
} */

.v-alert  {
color:#000;
}
.user-code-input .v-input input{
  text-align: center !important;
}
.home-cards{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 15rem;
}

@media (min-width: 476px) {
  .user-code-input .v-input{
    max-width: 100% !important;
    width: 100% !important;
  }
}
@media (max-width: 476px) {

  .action-btn{
    width: 170px !important;
    height: 60px !important;
    font-size: 10px !important;
  }
  .action-btn .v-icon{
    width: 18px !important;
    font-size: 25px !important;
  }
  .v-list-item:hover{
     box-shadow: inset 180px 0 0 0 #bfc5c7;
  }
}

</style>
