<template>
  <div>
    <v-avatar v-if="isLoggedIn" @click="toProfile" size="36">
      <v-img :src="userSession.user.photoURL || require('./avatar.png')" />
    </v-avatar>

    <v-dialog v-else v-model="loginDialog" width="340">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" outlined>
          Login<span class="hidden-xs-only">/Signup</span>
        </v-btn>
      </template>

      <v-card class="dialog-login text-center" dark>
        <v-card-title class="headline text-wrap" primary-title>
          <div class="d-flex text-center">
            Success usually comes to those who are too busy to be looking for
            it.
          </div>
        </v-card-title>
        <v-btn
          @click="loginWithGoogle"
          rounded
          class="flex-grow-1 mt-5"
          depressed
        >
          <v-icon left> mdi-google </v-icon>
          Login with Google
        </v-btn>
        <v-card-actions>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { userSession, loginWithGoogle, isLoggedIn } from '~/api/auth'
export default {
  setup() {
    return { userSession, loginWithGoogle, isLoggedIn }
  },
  data() {
    return {
      activeTab: 0,
      loginDialog: false,
    }
  },

  methods: {
    toProfile() {
      this.$router.push({ name: 'profile' })
    },
  },
}
</script>
