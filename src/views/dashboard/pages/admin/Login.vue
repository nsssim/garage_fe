<template>
  <body>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100">
          <div
            class="login100-pic js-tilt"
            data-tilt
          >
            <img
              style="margin-top:30%; margin-left:15%;"
              src="@/assets/logo.png"
              alt="IMG"
            >
          </div>

          <!--Login screen-->
          <form v-if="!forgot_password_page && !signup_page" class="login100-form validate-form">
            <div
              class="text-center logo-mobil"
              style="display:none"
            >
              <img
                width="200"
                style="margin-bottom:10%;"
                src="@/assets/logo.png"
                alt="IMG"
              >
            </div>
            <span
              style="color:#050a23;"
              class="login100-form-title"
            >
              {{ _T("panel") }}
            </span>
            <div class="row">
              <span
                v-if="username_pass_error"
                class="loginfail"
              >{{ _T('login_fail') }}</span>

            </div>


            <div
              class="wrap-input100 "
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                v-model="email"
                class="input100"
                type="email"
                name="email"
                :placeholder="_T('email')"
                @keypress.enter="send_data"
              >
              <span class="focus-input100" />
              <span class="symbol-input100">
                <i
                  class="mdi mdi-email"
                  aria-hidden="true"
                />
              </span>
            </div>

            <div
              class="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                v-model="password"
                class="input100"
                type="password"
                name="pass"
                :placeholder="_T('password')"
                @keypress.enter="send_data"
              >
              <span class="focus-input100" />
              <span class="symbol-input100">
                <i
                  class="mdi mdi-lock"
                  aria-hidden="true"
                />
              </span>
            </div>


            <div class="container-login100-form-btn ">
              <v-col cols="6" class="pr-2">

                  <v-btn
                elevation="2"
                class=" btn btn-block mybtn  text-white  turbg tx-tfm"
                style="background-color: #050a23; border-radius:30px"
                @click="signup_page = true"
              >
                {{ _T('signup_btn') }}
              </v-btn>
              </v-col>

               <v-col cols="6" >

                  <v-btn
                elevation="2"
                :loading="loading_button"
                class=" btn btn-block mybtn  text-white  turbg tx-tfm"
                style="background-color: #050a23; border-radius:30px"
                @click="send_data"
              >
                {{ _T('login_btn') }}
              </v-btn>
              </v-col>


              <div class="mx-auto mt-2">
                <h6 @click="forgot_password_page = true"  class="my-2 link-underscore-style" >{{_T('reset_password')}}</h6>
              </div>
            </div>
          </form>


          <!--Form for sign up page-->
          <form v-else-if="signup_page" action="javascript:void(0);" class="login100-form validate-form">
            <div
              class="text-center logo-mobil"
              style="display:none"
            >
              <img
                width="200"
                style="margin-bottom:10%;"
                src="@/assets/logo.png"
                alt="IMG"
              >
            </div>
            <span
              style="color:#050a23;"
              class="login100-form-title"
            >
              {{ _T("panel") }}
            </span>
            <div class="row">

              <span
                v-if="password_match_error"
                class="loginfail"
              >{{ _T('password_not_matching') }}</span>



              <!--If Passwords doesnt match.-->
              <span
                v-else-if="username_pass_error"
                class="loginfail"
              >{{ _T('login_fail') }}</span>

              <span
                v-if="signup_success"
                class="signup-success"
              >{{ _T('success_redirect_login_message') }}</span>



            </div>
            <div class="row">
              <span
                v-if="email_sent"
                id="emailsent"
                class="fa fa-success"
              >{{ _T('email_sent') }}</span>
            </div>

            <div
              class="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                v-model="femail"
                class="input100"
                type="email"
                name="email"
                :placeholder="_T('email')"
                @keypress.enter="send_signup_data"
              >

              <span class="focus-input100" />
              <span class="symbol-input100">
                <i
                  class="mdi mdi-email"
                  aria-hidden="true"
                />
              </span>
            </div>
            <div
              class="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                v-model="password"
                class="input100"
                type="password"
                name="pass"
                :placeholder="_T('password')"
                @keypress.enter="send_signup_data"
              >
              <span class="focus-input100" />
              <span class="symbol-input100">
                <i
                  class="mdi mdi-lock"
                  aria-hidden="true"
                />
              </span>
            </div>
            <div
              class="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                v-model="passwordAgain"
                class="input100"
                type="password"
                name="pass"
                :placeholder="_T('confirm_new_password')"
                @keypress.enter="send_signup_data"
              >
              <span class="focus-input100" />
              <span class="symbol-input100">
                <i
                  class="mdi mdi-lock"
                  aria-hidden="true"
                />
              </span>



            </div>
            <!--Password matching error-->
            <div>
              <!--check if user is already in system-->
              <span
                v-if="false"
                class="password-check-errors"
              >{{ _T('password_not_matching') }}</span>
              <div
                v-else-if="this.password.length === 0 && this.passwordAgain.length === 0 && this.femail.length === 0"
                style="height: 21px"
              ></div>
              <span
                v-else-if="this.password !== this.passwordAgain"
                class="password-check-errors"
              >{{ _T('password_not_matching') }}</span>
              <span
                v-else-if="this.password.length < 8"
                class="password-check-errors"
              >{{ _T('password_min') }}</span>
              <span
                v-else-if="this.password.length > 32"
                class="password-check-errors"
              >{{ _T('password_max') }}</span>
              <span
                v-else-if="this.password === this.password.toLowerCase() || this.password.toUpperCase() === this.password || !stringContainsNumber(this.password)"
                class="password-check-errors" style="font-size: 9px !important;"
              >{{ _T('password_validate') }}</span>
              <span
                v-else-if="this.femail.length === 0"
                class="password-check-errors"
              >{{ _T('email_error') }}</span>

              <!--Empty div with height 21px to dont float page-->
              <div
                v-else
                style="height: 21px"
              ></div>
            </div>





            <div class="container-login100-form-btn">
              <v-btn

                elevation="2"
                :disabled="!disable_button()"
                :loading="loading_button"
                class=" btn btn-block mybtn  text-white  turbg tx-tfm"
                style="background-color: #000; border-radius:30px"
                @click="send_signup_data()"


              >
                {{_T('signup_btn')}}

              </v-btn>
              <div class="mx-auto">
                <h6  @click="signup_page=false" class="my-2 link-underscore-style" >{{_T('login')}}</h6>
              </div>
            </div>
          </form>



          <!--Form for reset password screen-->
          <form v-else action="javascript:void(0);" class="login100-form validate-form">
            <div
              class="text-center logo-mobil"
              style="display:none"
            >
              <img
                width="200"
                style="margin-bottom:10%;"
                src="@/assets/logo.png"
                alt="IMG"
              >
            </div>
            <span
              style="color:#050a23;"
              class="login100-form-title"
            >
              {{ _T("panel") }}
            </span>
            <div class="row">
              <span
                v-if="username_pass_error"
                class="loginfail"

              >{{ _T('login_fail') }}</span>
            </div>
            <div class="row">
              <span
                v-if="email_sent"
                id="emailsent"
                class="fa fa-success"
              >{{ _T('email_sent') }}</span>
            </div>

            <div
              class="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                v-model="femail"
                class="input100"
                type="email"
                name="email"
                :placeholder="_T('email')"
                @keypress.enter="request_reset_password"
              >

              <span class="focus-input100" />
              <span class="symbol-input100">
                <i
                  class="mdi mdi-email"
                  aria-hidden="true"
                />
              </span>
            </div>
            <div class="container-login100-form-btn">
              <v-btn
                elevation="2"
                :loading="loading_button"
                class=" btn btn-block mybtn  text-white  turbg tx-tfm"
                style="background-color: #000; border-radius:30px"
                @click="request_reset_password"

              >
                {{_T('reset_password')}}
              </v-btn>
              <div class="mx-auto mt-2">
                <h6 @click="forgot_password_page = false" class="my-2 link-underscore-style" >{{_T('login')}}</h6>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
  import 'material-design-icons-iconfont/dist/material-design-icons.css'
  import '../../../../assets/loginpage/vendor/jquery/jquery-3.2.1.min.js'
  import '../../../../assets/loginpage/vendor/bootstrap/js/popper.js'
  import '../../../../assets/loginpage/vendor/bootstrap/css/bootstrap.min.css'
  import '../../../../assets/loginpage/vendor/animate/animate.css'
  import '../../../../assets/loginpage/vendor/css-hamburgers/hamburgers.min.css'
  import '../../../../assets/loginpage/vendor/select2/select2.min.css'

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
      stringContainsNumber(_string) {
        return /\d/.test(_string);
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
      }
    }

    //
  }
</script>

<style  scoped>

.mybtn{
    background-image: #000;
}

.link-underscore-style{
  color: rgba(0, 0, 0, 0.603);
  text-decoration: underline;
  cursor:pointer

}
.link-underscore-style:hover{
  color: #000;
}

/*//////////////////////////////////////////////////////////////////
[ FONT ]*/

@font-face {
  font-family: Poppins-Regular;
  src: url('../../../../assets/loginpage/fonts/poppins/Poppins-Regular.ttf');
}

@font-face {
  font-family: Poppins-Bold;
  src: url('../../../../assets/loginpage/fonts/poppins/Poppins-Bold.ttf');
}

@font-face {
  font-family: Poppins-Medium;
  src: url('../../../../assets/loginpage/fonts/poppins/Poppins-Medium.ttf');
}

@font-face {
  font-family: Montserrat-Bold;
  src: url('../../../../assets/loginpage/fonts/montserrat/Montserrat-Bold.ttf');
}

/*//////////////////////////////////////////////////////////////////
[ RESTYLE TAG ]*/

* {
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
}

body, html {
	height: 100%;
	font-family: Poppins-Regular, sans-serif;
}

/*---------------------------------------------*/

a {
	font-family: Poppins-Regular;
	font-size: 14px;
	line-height: 1.7;
	color: #666666;
	margin: 0px;
	transition: all 0.4s;
	-webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
	outline: none !important;
}

a:hover {
	text-decoration: none;
  color: #57b846;
}

/*---------------------------------------------*/
h1,h2,h3,h4,h5,h6 {
	margin: 0px;
}

p {
  font-family: Poppins-Regular;
	font-size: 14px;
	line-height: 1.7;
	color: #666666;
	margin: 0px;
}

ul, li {
	margin: 0px;
	list-style-type: none;
}

/*---------------------------------------------*/
input {
	outline: none;
	border: none;
}

textarea {
  outline: none;
  border: none;
}

textarea:focus, input:focus {
  border-color: transparent !important;
}

input:focus::-webkit-input-placeholder { color:transparent; }
input:focus:-moz-placeholder { color:transparent; }
input:focus::-moz-placeholder { color:transparent; }
input:focus:-ms-input-placeholder { color:transparent; }

textarea:focus::-webkit-input-placeholder { color:transparent; }
textarea:focus:-moz-placeholder { color:transparent; }
textarea:focus::-moz-placeholder { color:transparent; }
textarea:focus:-ms-input-placeholder { color:transparent; }

input::-webkit-input-placeholder { color: #999999; }
input:-moz-placeholder { color: #999999; }
input::-moz-placeholder { color: #999999; }
input:-ms-input-placeholder { color: #999999; }

textarea::-webkit-input-placeholder { color: #999999; }
textarea:-moz-placeholder { color: #999999; }
textarea::-moz-placeholder { color: #999999; }
textarea:-ms-input-placeholder { color: #999999; }

/*---------------------------------------------*/
button {
	outline: none !important;
	border: none;
	background: transparent;
}

button:hover {
	cursor: pointer;
}

iframe {
	border: none !important;
}

/*//////////////////////////////////////////////////////////////////
[ Utility ]*/
.loginfail{
  background-color: red;
  color: #fff;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 20px;
  width: 100%;
  font-size: 15px;
  opacity: 0.7;

}
.password-check-errors{

  background-color: red;
  color: #fff;
  padding: 1px 5px 2px 5px;
  margin: 5px;
  border-radius: 10px;
  width: 100%;
  font-size:10px;
  opacity: 0.7;

}
.signup-success{
  background-color: green;
  color: #fff;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 20px;
  width: 100%;
  font-size: 15px;
  opacity: 0.7;

}
#emailsent{
  background-color: green;
  color: #fff;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 20px;
  width: 100%;
  font-size: 15px;
  opacity: 0.7;

}
.txt1 {
  font-family: Poppins-Regular;
  font-size: 13px;
  line-height: 1.5;
  color: #999999;
}

.txt2 {
  font-family: Poppins-Regular;
  font-size: 13px;
  line-height: 1.5;
  color: #666666;
}

/*//////////////////////////////////////////////////////////////////
[ login ]*/

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-login100 {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  /* background: linear-gradient(90deg, rgb(67, 58, 165) 12%, rgb(70, 70, 163) 43%, rgb(35, 41, 167,0.5) 93%); */

  /* background-image: radial-gradient(circle, #075f89, #016f91, #157f98, #2e8e9c, #479da0); */

  /* background-image: linear-gradient(to right top, #075f89, #056a9a, #0375ab, #0381bd, #058ccf, #058ccf, #058ccf, #058ccf, #0381bd, #0375ab, #056a9a, #075f89); */

  /*  background-image: linear-gradient(to bottom, #050a23, #1f1832, #38233f, #532e49, #6d3b51, #6d3b51, #6d3b51, #6d3b51, #532e49, #38233f, #1f1832, #050a23); */

  /* background-image: linear-gradient(to left top, #050a23, #201932, #3a2540, #55324c, #704055, #704055, #704055, #704055, #55324c, #3a2540, #201932, #050a23); */

  /* background-image: linear-gradient(to bottom, #1b293f, #202133, #1f1a27, #1b131b, #140c11, #140c11, #140c11, #140c11, #1b131b, #1f1a27, #202133, #1b293f); */

   /* background-image: linear-gradient(to right bottom, #e0853f, #e58c39, #ea9333, #ed9a2b, #f0a222, #f0a222, #f0a222, #f0a222, #ed9a2b, #ea9333, #e58c39, #e0853f); */

    /* background-image: linear-gradient(to right bottom, #be6b2b, #c96f27, #d47423, #df781d, #ea7d16, #ea7d16, #ea7d16, #ea7d16, #df781d, #d47423, #c96f27, #be6b2b); */

     /* background-image: linear-gradient(to right bottom, #fe3c00, #fd4e00, #fc5c00, #fb6900, #fa7500, #fa7500, #fa7500, #fa7500, #fb6900, #fc5c00, #fd4e00, #fe3c00); */

      background-image: linear-gradient(to right top, #fe3c00, #f74300, #ef4a00, #e84f00, #e15302, #e15302, #e15302, #e15302, #e84f00, #ef4a00, #f74300, #fe3c00);
}

.wrap-login100 {
  width: 960px;
  background: #fff;
  border-radius: 100px;
  overflow: hidden;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 100px 130px 100px 95px;
  box-shadow: 10px 10px 100px #335ea259 inset;
}

/*------------------------------------------------------------------
[  ]*/
.login100-pic {
  width: 316px;
}

.login100-pic img {
  max-width: 100%;
}

/*------------------------------------------------------------------
[  ]*/
.login100-form {
  width: 290px;
}

.login100-form-title {
  font-family: Poppins-Bold;
  font-size: 24px;
  color: #333333;
  line-height: 1.2;
  text-align: center;

  width: 100%;
  display: block;
  padding-bottom: 54px;
}

/*---------------------------------------------*/
.wrap-input100 {
  position: relative;
  width: 100%;
  z-index: 1;
  margin-bottom: 10px;
}

.input100 {
  font-family: Poppins-Medium;
  font-size: 15px;
  line-height: 1.5;
  color: #666666;

  display: block;
  width: 100%;
  background: #e6e6e6;
  height: 50px;
  border-radius: 25px;
  padding: 0 30px 0 68px;
}

/*------------------------------------------------------------------
[ Focus ]*/
.focus-input100 {
  display: block;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 0px 0px;
  color: rgba(70, 106, 184, 0.8);
}

.input100:focus + .focus-input100 {
  -webkit-animation: anim-shadow 0.5s ease-in-out forwards;
  animation: anim-shadow 0.5s ease-in-out forwards;
}

@-webkit-keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}

@keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}

.symbol-input100 {
  font-size: 15px;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 35px;
  pointer-events: none;
  color: #666666;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.input100:focus + .focus-input100 + .symbol-input100 {
  color: #4a47a3;
  padding-left: 28px;
}

/*------------------------------------------------------------------
[ Button ]*/
.container-login100-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
}

.login100-form-btn {
  font-family: Montserrat-Bold;
  font-size: 15px;
  line-height: 1.5;
  color: #fff;
  text-transform: uppercase;

  width: 100%;
  height: 50px;
  border-radius: 25px;
  background: #4a47a3;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login100-form-btn:hover {
  background: #333333;
}

/*------------------------------------------------------------------
[ Responsive ]*/

@media (max-width: 992px) {
  .wrap-login100 {
    padding: 177px 90px 33px 85px;
  }

  .login100-pic {
    width: 35%;
  }

  .login100-form {
    width: 50%;
  }

}

@media (max-width: 768px) {
  .wrap-login100 {
    padding: 100px 80px 33px 80px;
  }

  .login100-pic {
    display: none;
  }

  .login100-form {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .wrap-login100 {
    padding: 100px 15px 33px 15px;
    min-height: 450px;
  }
  .login100-form .logo-mobil{
    display: block !important;

  }

  .container-login100-form-btn{
  justify-content: center !important;
  }
  .container-login100-form-btn button{
    width: 200px;
  }

}

/*------------------------------------------------------------------
[ Alert validate ]*/

.validate-input {
  position: relative;
}

.alert-validate::before {
  content: attr(data-validate);
  position: absolute;
  max-width: 70%;
  background-color: white;
  border: 1px solid #c80000;
  border-radius: 13px;
  padding: 4px 25px 4px 10px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 8px;
  pointer-events: none;

  font-family: Poppins-Medium;
  color: #c80000;
  font-size: 13px;
  line-height: 1.4;
  text-align: left;

  visibility: hidden;
  opacity: 0;

  -webkit-transition: opacity 0.4s;
  -o-transition: opacity 0.4s;
  -moz-transition: opacity 0.4s;
  transition: opacity 0.4s;
}

.alert-validate::after {
  content: "\f06a";
  font-family: FontAwesome;
  display: block;
  position: absolute;
  color: #c80000;
  font-size: 15px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 13px;
}

.alert-validate:hover:before {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 992px) {
  .alert-validate::before {
    visibility: visible;
    opacity: 1;
  }
}

</style>
