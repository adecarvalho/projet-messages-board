<template>
  <v-app>
    <v-toolbar dark color="primary">
      <v-layout align-start justify-start column>
        <v-flex xs4 sm2 md1>
          <v-avatar
              slot="activator"
              size="36px"
            >
            <v-img :src="user.image"></v-img>
          </v-avatar>
          {{user.name}}
        </v-flex>
	
      </v-layout>
     
        <v-spacer></v-spacer>

        <v-toolbar-items>

        <v-btn 
          :to="{name:'sujets'}"
          flat >
          <v-icon left dark>view_list</v-icon>
          Sujets
        </v-btn>

          <v-btn flat @click.prevent="logInWithGoogle" v-if="!isLogIn">
            <v-icon left dark>assignment_ind</v-icon>
            Connexion Google
          </v-btn>

          <v-btn flat @click="logOut" v-if="isLogIn">
            <v-icon left dark>person_add_disabled</v-icon>
            Deconnexion
          </v-btn>
          
        </v-toolbar-items>
    </v-toolbar>

    <main>
      <router-view/>
    </main>

    <Footer></Footer>

  </v-app>
</template>

<script>
import Footer from '@/components/Footer.vue'
import { mapActions, mapState } from 'vuex'

export default {
	name: 'App',
	components: {
		Footer
	},
	computed: {
		...mapState(['user', 'isLogIn'])
	},
	methods: {
		...mapActions(['logInWithGoogle', 'logOut'])
	}
}
</script>


<style scoped>
</style>
