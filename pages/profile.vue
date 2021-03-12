<template>
  <div v-if="isLoggedIn">
    <v-app-bar dense elevation="0" color="transparent">
      <v-btn @click="goBack" rounded text>
        <v-icon left> mdi-arrow-left </v-icon>
        <span class="hidden-xs-only">Go back</span>
      </v-btn>
    </v-app-bar>
    <v-container>
      <v-row no-gutters justify="center" align="start">
        <v-card width="500" class="mx-4 pa-2">
          <div style="display: grid; grid-template-columns: 125px 1fr">
            <v-img :src="userSession.user.photoURL" width="125" contain />
            <v-card-title primary-title>
              <div>
                <div class="headline">
                  {{ userSession.user.displayName }}
                </div>
                <div>{{ userSession.user.email }}</div>
              </div>
            </v-card-title>
          </div>
          <v-card-actions>
            <v-btn
              @click="
                logout()
                $router.push('/')
              "
              depressed
            >
              LOG OUT
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
      User Session:

      <v-card style="overflow: hidden">
        <pre>{{ userSession }}</pre>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { userSession, isLoggedIn, logout } from '~/api/auth'

import { version } from '~/package.json'

export default {
  name: 'App',
  middleware: ['auth'],
  setup() {
    return { userSession, logout, isLoggedIn }
  },
  data() {
    return {
      showButton: false,
    }
  },
  computed: {
    version() {
      return version
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>
