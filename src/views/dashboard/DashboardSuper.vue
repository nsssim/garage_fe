<template>
  <v-container

    id="dashboardSuper"
    fluid
    tag="section"
  >

      <v-col
        cols="12"
        style="float:left;"
      >
        <base-material-card
          color="#1d1d1d"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div @click="clickevent(0)" class="display-2 font-weight-light">
              {{_T('users')}}
              <br>


            </div>
          </template>
          <v-card-text>
            <v-data-table

              :items-per-page="10"

              :headers="headers_all_devices"
              :items="users"
              class="elevation-1"
              :search="devices_search"
            >
            <template v-slot:top>
              <v-row>
                <v-col cols="12" sm="8">
                    <v-text-field
                      class="mx-5 mb-5"
                        v-model.trim="devices_search"
                        append-icon="mdi-magnify"
                        :label="_T('search')"
                        single-line
                        hide-details
                      ></v-text-field>
                </v-col>
                <v-col class="text-right" cols="12" sm="4">
                  <template>
                    <v-row justify="end" class="my-2">
                      <v-dialog
                        v-model="add_rfid_dialog"
                        max-width="600px"
                      >
                        <template v-slot:activator="{ attrs }">
                          <!-- <vs-button
                            border
                            color="#000b24"
                            @click="active = 1; open_add_rfid_dialog()"
                            v-bind="attrs"
                          >
                            <v-icon >
                              mdi-plus
                            </v-icon>
                          </vs-button> -->
                          <vs-tooltip>
                            <vs-button

                              color="#000b24"
                              @click="active = 1; open_add_rfid_dialog()"
                              v-bind="attrs"
                              circle
                            >
                              <v-icon color="white" size="25" >
                                mdi-plus
                              </v-icon>
                            </vs-button>
                            <template #tooltip>
                              {{_T('add_new')}}
                            </template>
                          </vs-tooltip>

                        </template>
                        <v-card
                        style="border: solid 15px #050a23; border-radius:10px;"
                        class="py-5 px-2"
                        >
                            <v-card-title>
                            <span class="text-h3">{{_T('add_rfid')}}</span>
                            </v-card-title>
                            <v-card-text class="pb-0">
                                <v-container>
                                    <v-row>
                                    <v-col
                                        cols="12"
                                        sm="12"
                                        md="12"
                                    >
                                       <v-text-field
                                        v-model="rfid_number"
                                        outlined
                                        :label="_T('enter_rfid')"
                                        required
                                        :error-messages="rfidErrors"
                                        @input="$v.rfid_number.$touch()"
                                        @blur="$v.rfid_number.$touch()"
                                      ></v-text-field>
                                    </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="error darken-1"
                                @click="close_add_rfid_dialog()"
                            >
                                {{_T('close')}}
                            </v-btn>
                            <v-btn
                                color="success darken-1"
                                @click="save_rfid_code_request()"
                                :disabled="saveButton"
                            >
                               {{_T('save')}}
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                      </v-dialog>

                      <template>
                        <div class="mx-5 text-center">
                          <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            origin="left left"
                            offset-y
                            rounded="lg"


                          >
                            <template v-slot:activator="{ on, attrs }">
                              <vs-button
                                color="success"
                                border
                                dark
                                v-bind="attrs"
                                v-on="on"
                                @click="activeUploadBtn=1"
                                :activeUploadBtn="activeUploadBtn == 1"
                              >
                                <v-icon
                                  fab
                                  dark
                                  class="ml-2"
                                  left
                                  size="25"

                                >
                                  mdi-microsoft-excel
                                </v-icon>
                                <span style="color:black">{{_T('file_actions')}}</span>
                              </vs-button>

                            </template>

                            <v-card elevation="0" class="text-center m-0 p-0 py-0">
                              <v-list class="text-center p-0">
                                <v-list-item @click="open_upload_excel_dialog"  class="justify-content-start ">
                                  <div class="d-flex hvr-bounce-to-right">
                                    <v-icon
                                    fab
                                    dark
                                    class="ml-2 mr-5"
                                    left
                                  >
                                    mdi-tray-arrow-up
                                  </v-icon>
                                  <p
                                    class="m-0"

                                  >
                                    {{_T('import_file')}}
                                  </p>
                                  </div>
                                </v-list-item>
                                <v-divider class="m-0"></v-divider>

                                <!-- Download actual data as xls file-->
                                <export-excel
                                    class="m-0 "
                                    :data="users"
                                    :fields="usersProperties"
                                    worksheet = "My Worksheet"
                                    name    = "filename.xls"
                                    type    = "xls">

                                      <v-list-item  class="justify-content-start">
                                        <div class="d-flex">
                                          <v-icon
                                          fab
                                          dark
                                          class="ml-2 mr-5"
                                          left

                                        >
                                        mdi-tray-arrow-down
                                  </v-icon>

                                   <span>{{_T('export_file')}}</span>


                                  </div>
                                  </v-list-item>
                                </export-excel>
                                 <v-divider class="m-0"></v-divider>

                                <!-- Download Template data as xls file-->
                                 <export-excel

                                    class="m-0"
                                    style="display:flex;"
                                    :data="templateData"
                                    worksheet = "Data"
                                    name    = "data.csv"
                                    type    = "csv"
                                    v-model="loaderFlag"
                                    :before-generate = "startDownload"
                                    :before-finish   = "finishDownload">

                                  <v-list-item   class="justify-content-start  " >
                                    <div class="d-flex">
                                      <v-icon
                                      fab
                                      dark
                                      class="ml-2 mr-5"
                                      left
                                    >
                                      mdi-tray-arrow-down
                                    </v-icon>

                                        <span>{{_T('template_file')}}</span>
                                        <div class="loader" v-if="loaderFlag==1"></div>

                                    </div>
                                  </v-list-item>
                                </export-excel>

                              </v-list>

                            </v-card>
                          </v-menu>
                        </div>
                      </template>

                       <v-dialog
                        v-model="upload_excel_dialog"
                        max-width="600px"
                      >



                        <v-card
                        style="border: solid 15px #050a23;border-radius:10px;"
                        class="py-5 px-2"
                        >
                            <v-card-title>
                            <span class="text-h3">{{_T('upload_rfid')}}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                    <v-col
                                        cols="12"
                                        sm="12"
                                        md="12"
                                    >
                                        <v-file-input
                                          accept=".csv"
                                          :label="_T('choose_file')"
                                          type="file"
                                          ref="file"
                                          v-model="excel_file"
                                          class="mb-0 pb-0"
                                          hide-details=""
                                          outlined
                                        ></v-file-input>
                                        <span v-if="error_file_ext" class="ml-5 mt-0" style="color:red;font-size:13px;font-weight:500">{{_T('file_validate')}}</span><span></span>
                                    </v-col>

                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="error darken-1"

                                @click="close_upload_excel_dialog()"
                            >
                                {{_T('close')}}
                            </v-btn>
                            <v-btn
                                color="success darken-1"
                                :disabled="error_file_ext || saveButtonFile"
                                :loading="saveButton"
                                @click="upload_file_request"
                            >
                               {{_T('save')}}
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-row>
                  </template>
                </v-col>
              </v-row>
            </template>
            <!-- SLOT -->
            <template v-slot:[`item.status`]="{ item }">

               <v-chip
                class="ma-2"
                color="success"
                rounded="lg"
                outlined
                style="max-width:150px"
                v-if="item.status == 1"
              >
              <v-icon left>
                  mdi-check
                </v-icon>
              {{_T('valid_status')}}
              </v-chip>
              <v-chip
                class="ma-2"
                outlined
                color="error"
                rounded="10"
                style="max-width:150px"
                v-if="item.status == 0"
              >
                <v-icon left>
                  mdi-cancel
                </v-icon>
                {{_T('used_status')}}
              </v-chip>
            </template>


            <template v-slot:[`item.actions`]="{ item }">
                  <v-btn
                    v-if="!deleteButton"
                    class="mx-2 justify-content-right"

                    rounded
                    color="red"

                    @click="delete_user_request(item)"
                  >
                    <v-icon dark class="mx-2">
                      mdi-delete
                    </v-icon>
                    {{_T('delete')}}
                  </v-btn>
                  <v-btn
                    v-else
                    class="mx-2"
                    rounded
                    color="red"

                    :loading="true"
                  >
                    <v-icon dark class="mx-2">
                      mdi-delete
                    </v-icon>
                  </v-btn>
            </template>
            <template v-slot:[`item.user_code`]="{ item }">
              <div class="user-code-input text-center d-flex">
                <v-text-field

                class="py-2"
                style="min-width:120px !important;max-width:130px;margin:0px auto !important"
                v-model="item.user_code"
                hide-details=""

                readonly
                elavation="0"
                >

                </v-text-field>
              </div>
            </template>



            </v-data-table>


          </v-card-text>

        </base-material-card>
      </v-col>
      <v-overlay :value="loading">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>

  </v-container>

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

.v-alert .v-alert__wrapper .v-alert__content {
    font-weight: 300;
    color: #fff;
}

.v-alert  {
color:#000;
}
.user-code-input .v-input input{
  text-align: center !important;
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
