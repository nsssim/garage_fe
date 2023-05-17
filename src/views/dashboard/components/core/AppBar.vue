
<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="#050a23"
    flat
    height="87"

  >

    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >

      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <b style="color:#fff;"> {{_T('panel')}} </b>

    <v-spacer />


    <div  class="locale-switcher">
    <select style="border:solid 1px #fff; padding:10px; border-radius:5px; color:#fff;" class="form-select" v-model="$i18n.locale">
      <option style="color:#000"  value="en">English</option>
      <option  style="color:#000" value="tr">Türkçe</option>
    </select>


  </div>

    <div class="mx-3" />

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
    </v-menu>
  </v-app-bar>
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations } from 'vuex'



  export default {
    name: 'DashboardCoreAppBar',
    components: {
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
        },
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },


    },

    data: () => ({

      notifications: [
        'Mike John Responded to your email',
        'You have 5 new tasks',
        'You\'re now friends with Andrew',
        'Another Notification',
        'Another one',
      ],


    }),

    computed: {
      ...mapState(['drawer']),
      _T()
      {
        return this.$t;
      }, // for i18 ;)

    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),

    },

  }
</script>


<style scoped>
.v-toolbar__content { background-color: #075f89 !important; }

.divider-for-company{
  margin-left:0.7rem; margin-right:0.7rem; height:30% ; width: 1px; background-color:white;
}


</style>
