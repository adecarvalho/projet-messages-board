<template>
  <v-container>
    <v-layout row wrap justify-center>
      <h1>{{$route.params.name}}</h1>
    </v-layout>

    <v-layout row wrap justify-center>
      <v-flex xm12 sm6>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="post.name"
            label="Nom"
            required>
          </v-text-field>

          <v-text-field
            v-model="post.prenom"
            label="Prénom"
            required>
          </v-text-field>

          <v-text-field
            v-model="post.commentaire"
            placeholder="Décrire brièvement vos actions de la semaine"
            label="Commentaires"
            multi-line
            clearable
            counter
            maxlength="500"
            required>
          </v-text-field>

          <v-btn
            :disabled="valid"
            @click="submit">
            Envoyer
          </v-btn>

          <v-btn 
            @click="clear">
            Effacer
          </v-btn>
  
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
	data() {
		return {
			valid: false,

			post: {
				name: "a",
				prenom: "b",
				commentaire: ""
			}
		}
	},
	methods: {
		submit() {
			if (this.$refs.form.validate()) {
			}
		},
		clear() {
			this.$refs.form.reset()
		}
	}
}
</script>

