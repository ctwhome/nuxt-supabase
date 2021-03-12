import { supabase } from '~/plugins/supabase'
import { ref, computed } from '@nuxtjs/composition-api'

// state
const userSession = ref({})

// Getter
const isLoggedIn = computed(
  () => userSession.value?.user?.aud === 'authenticated'
)

// Actions
function loginWithGoogle() {
  supabase.auth.signIn({ provider: 'google' })
}

async function logout() {
  await supabase.auth.signOut()
}

const setUserSession = (session) => {
  userSession.value = session
}

// Handle Auth user changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Event', event)
  console.log('User ', session)
  userSession.value = session
})
export { userSession, isLoggedIn, setUserSession, loginWithGoogle, logout }
