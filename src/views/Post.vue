<template>
  <v-container>
    <v-layout align-center justify-center row fill-height wrap>
      <h1>{{$route.params.name}}</h1>
      <v-btn v-if="isLogIn" @click="edition=!edition" class='ml-5' color="primary">Edition</v-btn>
    </v-layout>

    <v-layout row wrap justify-center>
      <v-flex xm12 sm6>
        <v-form v-if='edition' ref="form" v-model="valid" lazy-validation>
          <!-- <v-text-field
            v-model="post.name"
            :rules="champVide"
            label="Nom"
            required>
          </v-text-field>

          <v-text-field
            v-model="post.prenom"
            label="Prénom"
            :rules="champVide"
            required>
          </v-text-field> -->

          <v-textarea
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
            :enabled="valid"
            color="success"
            @click="envoyerPost">
            Envoyer
          </v-btn>

          <v-btn 
            @click="clear">
            Effacer
          </v-btn>
  
        </v-form>
      </v-flex>
    </v-layout>

      <v-layout align-start justify-start row fill-height wrap>
        <v-flex xs12 sm4  v-for="post in posts" :key="post.id">
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

        <v-card-text v-show="show">
            {{post.commentaire}}
          </v-card-text>

        <v-card-actions>
          <v-btn icon>
            <v-icon>bookmark</v-icon>
          </v-btn>
        </v-card-actions>


      </v-card>
    </v-flex>
  </v-layout>

  </v-container>
</template>


<script>
import { mapState, mapActions, mapGetters } from "vuex"

export default {
	name: "post",

	data() {
		return {
			show: true,
			valid: false,
			edition: false,
			champVide: [
				val => {
					if (val === "") {
						return "Erreure saisie"
					} else {
						return true
					}
				}
			],

			post: {
				name: "",
				prenom: "",
				commentaire: ""
			}
		}
	},
	watch: {
		"$route.params.name"() {
			this.initTheSujet(this.$route.params.name)
		},

		the_sujet() {
			if (this.the_sujet.id) {
				this.initPosts(this.the_sujet.id)
			}
		}
	},
	mounted() {
		this.initTheSujet(this.$route.params.name)
	},
	computed: {
		...mapState(["isLogIn", "posts"]),
		...mapGetters({
			the_sujet: "getTheSujet"
		})
	},

	methods: {
		...mapActions(["createNewPost", "initTheSujet", "initPosts"]),

		getDate(val) {
			const options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric"
			}
			const date = new Date(val * 1000)

			return date.toLocaleDateString("fr-FR", options)
		},

		async envoyerPost() {
			if (this.$refs.form.validate()) {
				console.log("envoyer ")

				await this.createNewPost(this.post)
				this.$refs.form.reset()
				this.edition = false
			}
		},
		clear() {
			this.$refs.form.reset()
		}
	}
}
</script>

