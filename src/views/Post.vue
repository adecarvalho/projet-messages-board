<template>
  <v-container>
    <v-layout align-center justify-center row fill-height wrap>
      <h1>{{$route.params.name}}</h1>
      <!-- <v-btn v-if="isLogIn" @click="edition = !edition" class='ml-5' color="primary">Commentaires</v-btn> -->

      <v-btn v-if="isLogIn" fab dark color="purple"
      @click="edition = !edition">
      <v-icon dark>edit</v-icon>
    </v-btn>
    </v-layout>

     <v-layout align-center justify-center row wrap>
       <v-flex xm12 sm8>
         <v-text-field
          v-model="searchTerm"
          label="Recherche">
          </v-text-field> 
       </v-flex>
    </v-layout>

    <v-layout row wrap justify-center>
      <v-flex xm12 sm8>
        <v-form v-if='edition' ref="form" v-model="valid" lazy-validation>
          
          <v-textarea
            solo
            v-model="post.commentaire"
            placeholder="Décrire brièvement vos actions de la semaine"
            label="Commentaires"
            clearable
            counter
            maxlength="500"
            :rules="champVide"
            required>
          </v-textarea>

          <v-btn
            :disabled="!valid"
            round
            color="success"
            @click="envoyerPost">
            Envoyer
          </v-btn>

          <v-btn 
            color="error"
            round
            @click="clear">
            Effacer
          </v-btn>
  
        </v-form>
      </v-flex>
    </v-layout>

      <v-layout align-start justify-start row fill-height wrap>
        <v-flex xs12 sm4  v-for="post in filteredPost" :key="post.id" v-if="filteredPost">
        <v-card class="ma-4">
         
        <v-card-title primary-title>
          <div>
            <div class="headline">
              <v-avatar
                slot="activator"
                size="36px">
                <v-img :src="post.user_image"></v-img>
              </v-avatar>
              {{post.user_name}}</div>
            <span class="grey--text">le, {{getDate(post.created_at.seconds)}}</span>
          </div>
        </v-card-title>

        <v-card-text>
          <div class="text-xs-left">
            <v-badge v-if="post.visa"
            color="green"
            left
            overlap>
              <v-icon
              slot="badge"
              dark
              small>done
              </v-icon>
              <v-icon
              large
              color="grey darken-1">
              markunread
              </v-icon>
          </v-badge>
          <v-badge v-else
            overlap
            color="orange">
              <v-icon
              slot="badge"
              dark
              small>notifications
              </v-icon>
              <v-icon
              large
              color="grey darken-1">
              mail
              </v-icon>
          </v-badge>
          </div>
          
            {{post.commentaire}}
            <hr/>

            <div class="remarques">
              {{post.remarques}}
            </div>

          </v-card-text>

        <v-card-actions v-if=user.isAdmin>

          <v-btn 
            flat icon
            :to="{name:'visa',
                params:{post_id:post.id}}"
            >
            <v-icon>supervisor_account</v-icon>
          </v-btn>
        </v-card-actions>


      </v-card>
    </v-flex>
  </v-layout>

  </v-container>
</template>


<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
	name: 'post',

	data() {
		return {
			searchTerm: '',
			show: true,
			valid: true,
			edition: false,
			champVide: [
				val => {
					if (val.length == 0) {
						return 'Erreure saisie'
					} else {
						return true
					}
				}
			],

			post: {
				commentaire: ''
			}
		}
	},
	watch: {
		'$route.params.name'() {
			this.initTheSujet(this.$route.params.name)
		},

		the_sujet() {
			if (this.the_sujet.id && this.the_sujet) {
				this.initPosts(this.the_sujet.id)
			}
		}
	},
	mounted() {
		this.initTheSujet(this.$route.params.name)
	},
	computed: {
		...mapState(['isLogIn', 'posts', 'user']),

		...mapGetters({
			the_sujet: 'getTheSujet'
		}),

		filteredPost() {
			if (this.searchTerm) {
				const regexp = new RegExp(this.searchTerm, 'gi')

				if (this.posts) {
					return this.posts.filter(post => post.user_name.match(regexp))
				} else return null
			}
			return this.posts
		},

		isAdmin() {
			if (this.user.isAdmin) {
				return true
			}
			return false
		}
	},

	methods: {
		...mapActions([
			'createNewPost',
			'initTheSujet',
			'initPosts',
			'setPostVisa'
		]),

		onVisa(post) {
			this.setPostVisa(post.id)
		},

		getDate(val) {
			const options = {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			}
			const date = new Date(val * 1000)

			return date.toLocaleDateString('fr-FR', options)
		},

		async envoyerPost() {
			if (this.$refs.form.validate()) {
				//console.log("envoyer ")
				await this.createNewPost(this.post)
				this.$refs.form.reset()
				this.edition = false
				this.post.commentaire = ''
				this.valid = false
			}
		},
		clear() {
			this.$refs.form.reset()
		}
	}
}
</script>

<style scoped>
.remarques {
	color: #a11919;
	text-align: left;
}
</style>


