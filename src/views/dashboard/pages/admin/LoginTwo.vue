<template>
  <body>
    <div class="limiter">
		  <div class="container-login100">
		  	<div class="wrap-login100">
          <div class="login-mobile container justify-content-center d-none">
            <img src="../../../../assets/logo.png" alt="">
          </div>
            <div class="col-12 col-md-12 d-flex justify-content-end" style="padding:0px 0px; margin:10px; align-items:center;position:absolute !important">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                        v-bind="attrs"
                        v-on="on"
                        color="#000"
                        class="mr-2"
                        >
                        mdi-web
                  </v-icon>
                </template>
                <span>Dil</span>
              </v-tooltip>
                <select style="border:solid 1px #333; padding:5px;padding-left:20px; border-radius:5px;" v-model="$i18n.locale"><i aria-hidden="true" class="v-icon notranslate mdi mdi-login theme--dark" style="font-size: 20px; color:#000;"></i>
                    <option value="en"> English </option>
                    <option value="tr">Türkçe</option>
                  </select>
            </div>

            <div v-if="forgot_password_page && !signup_page"  class="login100-form validate-form">
              <span class="login100-form-title p-b-34">
                {{_T('login')}}
              </span>
              <v-alert
                dense
                outlined
                type="success"
                class="success-info d-flex align-items-center"
                v-if="reset_password_msg"
              >
                  {{_T('email_sent')}}
              </v-alert>
              <v-alert
                dense
                outlined
                type="error"
                class="fail-info d-flex align-items-center"
                v-if="email_check_error"
              >
                  {{_T('email_error')}}
              </v-alert>

              <div class="wrap-input100 rs1-wrap-input100 validate-input m-b-20" data-validate="Type user name">
                  <input id="first-name" v-model="femail" class="input100" type="text" name="username" :placeholder="_T('email')">
                  <span class="focus-input100"></span>
              </div>

              <div class="container-login100-form-btn">
                <button @click="send_check_email" class="login100-form-btn">
                  {{ _T('reset_password') }}
                </button>
              </div>

              <div @click="forgot_password_page = false" class="w-full text-center p-t-0 p-b-100">
                <span class="txt1">
                  <a style="text-decoration:underline" href="#" class="txt2">{{_T('login_btn')}}</a>
                </span>

                  <!-- <a href="#" class="txt2">
                    User name / password?
                  </a> -->
              </div>

              <div @click="signup_page_btn" class="w-full text-center">
                <a href="#" style="text-decoration:underline" class="txt3">
                  {{_T('signup_btn')}}
                </a>
              </div>
            </div>
                <!-- login form -->
				    <div v-else-if="!signup_page &&!forgot_password_page" class="login100-form validate-form">


					    <span class="login100-form-title p-b-34">
						    {{_T('login')}}
				    	</span>
              <v-alert
                dense
                outlined
                type="error"
                class="fail-info color-red d-flex align-items-center"
                v-if="username_pass_error"
              >
                {{_T('login_fail')}}
              </v-alert>

					    <div class="wrap-input100 rs1-wrap-input100 validate-input m-b-20" data-validate="Type user name">
						    <input id="first-name" v-model="email" class="input100" type="text" name="username" :placeholder="_T('email')">
						    <span class="focus-input100"></span>
					    </div>
					    <div class="wrap-input100 rs2-wrap-input100 validate-input m-b-20" data-validate="Type password">
						    <input class="input100" v-model="password" type="password" name="pass" :placeholder="_T('password')">
						    <span class="focus-input100"></span>
					    </div>

					    <div class="container-login100-form-btn">
					    	<button @click="send_data" class="login100-form-btn">
					    		{{ _T('login_btn') }}
					    	</button>
					    </div>

					    <div @click="forgot_password_page = true" class="w-full text-center p-t-0 p-b-100">
						    <span class="txt1">
						    	<a href="#" style="text-decoration:underline" class="txt2">{{_T('forgot_password')}}</a>
						    </span>

						    <!-- <a href="#" class="txt2">
						    	User name / password?
						    </a> -->
					    </div>

					    <div @click="signup_page_btn" class="w-full text-center">
						    <a  href="#" class="txt3">
						    	{{_T('signup_btn')}}
						    </a>
					    </div>
				    </div>
            <!-- singup form -->
            <div v-else-if="signup_page && !forgot_password_page" action="#" class="login100-form validate-form">


					    <span class="login100-form-title p-b-34">
					  	  {{_T('login')}}
					    </span>
              <v-alert
                dense
                outlined
                type="error"
                class="fail-info d-flex align-items-center"
                v-if="username_pass_error"
              >
                {{_T('login_fail')}}
              </v-alert>

					    <div class="wrap-input100 rs1-wrap-input100 validate-input m-b-20" data-validate="Type user name">
					    	<input id="first-name" v-model="email" class="input100" type="text" name="username" :placeholder="_T('email')">
					    	<span class="focus-input100"></span>
					    </div>
					    <div class="wrap-input100 rs2-wrap-input100 validate-input m-b-20" data-validate="Type password">
					    	<input class="input100" v-model="password" type="password" name="pass" :placeholder="_T('password')">
					    	<span class="focus-input100"></span>
					    </div>

					    <div class="container-login100-form-btn">
					    	<button @click="send_data" class="login100-form-btn">
					    		{{ _T('signup_btn') }}
					    	</button>
					    </div>


					    <div @click="login_page" class="w-full text-center">
						    <a style="text-decoration:underline" href="#" class="txt3">
						  	  {{_T('login_btn')}}
						    </a>
					    </div>
				    </div>

				    <div class="login100-more"></div>
			  </div>
		  </div>
	  </div>



	  <div id="dropDownSelect1"></div>
  </body>
</template>

<script>
//   import 'material-design-icons-iconfont/dist/material-design-icons.css'
//   import '../../../../assets/loginpage/vendor/jquery/jquery-3.2.1.min.js'
//   import '../../../../assets/loginpage/vendor/bootstrap/js/popper.js'
//   import '../../../../assets/loginpage/vendor/bootstrap/css/bootstrap.min.css'
//   import '../../../../assets/loginpage/vendor/animate/animate.css'
//   import '../../../../assets/loginpage/vendor/css-hamburgers/hamburgers.min.css'
//   import '../../../../assets/loginpage/vendor/select2/select2.min.css'

  import '../../../../assets/loginpage2/vendor/bootstrap/css/bootstrap.min.css';
  import '../../../../assets/loginpage2/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
  import '../../../../assets/loginpage2/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
  import '../../../../assets/loginpage2/vendor/animate/animate.css';
  import '../../../../assets/loginpage2/vendor/css-hamburgers/hamburgers.min.css';
  import '../../../../assets/loginpage2/vendor/animsition/css/animsition.min.css';
  import '../../../../assets/loginpage2/vendor/select2/select2.min.css';
  import '../../../../assets/loginpage2/vendor/daterangepicker/daterangepicker.css';
  import '../../../../assets/loginpage2/css/util.css';
  import '../../../../assets/loginpage2/css/main.css';

  export default {
    name: 'Login',

    props: {

    },

    data: () => ({
      BASE_URL: process.env.VUE_APP_BASE_URL,
      API_URL: process.env.VUE_APP_API_URL,

      email: null,
      email_sent : false,
      password: "",
      passwordAgain : "",
      femail : "",
      username_pass_error: false,
      password_match_error: false,
      loading_button: false,
      signup_success : false,

      forgot_password_page : false,
      signup_page : false,

      isDisable : false,
      email_check_error : false,
      reset_password_msg : false,

    }),

    computed: {

      _T () { return this.$t },
      lang () { return this.$t('lang') },




    },
    async mounted () {
      // if (localStorage.token != '') {
      //   const token_check = await this.check_token().catch(e => {

      //   })
      //   console.log(token_check)
      //   if (token_check.code == 2000) {
      //     this.$router.push({ path: '/admin/devices' })
      //   }
      // }

    },

    methods: {

      signup_page_btn(){
        this.signup_page = true
        this.forgot_password_page = false

      },
      sign_page_login(){
        this.signup_page = false
        this.forgot_password_page = true
      },
      login_page(){
        this.signup_page = false;
        this.forgot_password_page = false;
      },
      stringContainsNumber(_string) {
        return /\d/.test(_string);
      },

      async send_check_email(){
        const form_data = {}
        form_data.email = this.femail

        await this.axios.post(this.API_URL + '/admin/reset_password', form_data).then((response) => {
          if(response.status == 200) {
            this.show_reset_password_msg()
          }
        }).catch(error => {
          console.log(error)
          this.show_email_check_error()
        })
      },

      async send_data () {
        this.loading_button = true
        this.login_button = true
        const form_data = {}
        form_data.email = this.email
        form_data.password = this.password

        await this.axios.post(this.API_URL + '/admin/login', form_data).then((response) => {
          if (response.status === 200) {
            this.$cookies.set("a_token", response.data.a_token, "")
            this.$cookies.set("r_token", response.data.r_token, "")
            this.$cookies.set("e_token", "", "")

            this.$router.push({ path: '/admin/dashboard' })
          }
        }).catch(error => {
          this.loading_button = false
          console.log(error)
          this.show_username_pass_error()

        })
      },

      async send_signup_data () {
        this.loading_button = true
        this.login_button = true
        const form_data = {}
        form_data.email = this.femail
        form_data.password = this.password
        const tempPassword = this.passwordAgain

        if (this.password !== tempPassword){
          this.password_match_error = true
          setTimeout(() => {
            this.password_match_error = false
          }, 5000);
          this.loading_button = false
        }
        else {
          await this.axios.post(this.API_URL + '/admin/signup', form_data).then((response) => {
            if (response.status === 200) {
              console.log("başarılı")
              this.signup_success = true
              // this.$cookies.set("a_token", response.data.a_token, "")
              // this.$cookies.set("r_token", response.data.r_token, "")
              // this.$cookies.set("e_token", "", "")

              this.loading_button = false


              this.password =  ""
              this.passwordAgain =  ""
              this.signup_success = true
              setTimeout(() => {

                this.signup_page = false
                this.signup_success = false
              }, 2000);
              //this.$router.push({ path: '/admin/login' })

            }
          }).catch(error => {
            this.loading_button = false
            console.log(error)
            this.show_username_pass_error()
            })
          }
        },



      show_password_match_error () {
        this.username_pass_error = true
        setTimeout(() => {
          this.username_pass_error = false
        }, 5000)
      },


      async request_reset_password () {
        this.loading_button = true
        this.login_button = true
        const form_data = {}
        form_data.email = this.femail

        await this.axios.post(this.API_URL + '/reset_pass', form_data).then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.loading_button = false;
            this.login_button = false;
            this.show_email_send_msg();
          }
        }).catch(error => {
          this.loading_button = false
          console.log(error)
          this.show_username_pass_error()

        })
      },

      disable_button(){
        return (this.password.length >= 8 && this.passwordAgain.length >= 8 && this.femail.length !== 0 &&
          this.password !== this.password.toLowerCase() && this.password === this.passwordAgain);
      },


      show_username_pass_error () {
        this.username_pass_error = true
        setTimeout(() => {
          this.username_pass_error = false
        }, 5000)
      },
      show_email_send_msg() {
        this.email_sent = true
        setTimeout(() => {
          this.email_sent = false
          this.femail = null
          this.forgot_password_page = false
        }, 5000)
      },
      show_email_check_error() {
        this.email_check_error = true
        setTimeout(() => {
          this.email_check_error = false
          this.femail = null
        }, 5000)
      },
      show_reset_password_msg() {
        this.reset_password_msg = true
        setTimeout(() => {
          this.reset_password_msg = false
          this.femail = null
          this.login_page()
        }, 5000)
      },




      check_token () {
        return new Promise((resolve, reject) => {
          const formData = {}
          formData.token = localStorage.token
          // start axios
          var post_config =
            {
              method: 'post',
              url: this.API_URL + '/admin/check_token',
              headers: {
                'Content-Type': 'application/json',
              },
              data: formData,
            }

          this.axios(post_config)
            .then(response => {
              if (response.data == undefined) reject('no response')
              if (response.status === 401) {
                // invalid token
                console.log('check_token 200  -> invalid token')
                // localStorage.token = "";
                // window.location.href = this.BASE_URL + "/user/login"
                reject('invalid_token')
              }
              resolve(response.data)
            })
            .catch(e => {
              console.log('horor:' + e)
              // localStorage.token = "";
              // window.location.href = this.BASE_URL + "/user/login"
              reject('invalid_token')
            })
        })
      },
    },

    watch : {
      signup_page(val){
        if (!val){
          this.password = ""
          this.passwordAgain = ""
          this.femail = ""
        }
      },

    }

    //
  }
</script>

<style scoped>
    .fail-info{
        color: red !important;
        padding : 5px 20px;
        width : 100%
    }
    .success-info{
        color: green !important;
        padding : 5px 20px;
        width : 100%
    }
    .fail-info div div{
        color: red !important;
        /* padding : 5px 20px;
        width : 100% */
    }

</style>

</style>
