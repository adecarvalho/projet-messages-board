<template>
  <v-container>
    <v-layout row wrap justify-center>
      <h1>{{$route.params.name}}</h1>
      <v-btn v-if="isLogIn" @click="edition=!edition" class='ml-5' color="primary">Edition</v-btn>
    </v-layout>

    <v-layout row wrap justify-center>
      <v-flex xm12 sm6>
        <v-form v-if='edition' ref="form" v-model="valid" lazy-validation>
          <v-text-field
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
          </v-text-field>

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

        <pre>{{posts}}</pre>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapState, mapActions } from "vuex"

export default {
	data() {
		return {
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
	computed: {
		...mapState(["isLogIn", "posts"])
	},

	methods: {
		...mapActions(["createNewPost"]),

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

