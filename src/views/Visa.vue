<template>
  <v-container>
    <v-layout align-center justify-center row fill-height wrap>
      <h1>{{this.the_sujet[0].name}}</h1>
      
    </v-layout>

    <v-layout row wrap justify-center>
      <v-flex xm12 sm8>
        <v-form ref="form">
          
          <v-textarea
						 box
            label='Remarques'
            v-model='visa.les_remarques'
            >
          </v-textarea>

          <v-btn
            color="success"
            @click="envoyerVisa($route.params.post_id)">
            Envoyer
          </v-btn>

        </v-form>
      </v-flex>
    </v-layout>

  </v-container>
</template>


<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'visa',

	data() {
		return {
			visa: {
				post_id: 0,
				les_remarques: ''
			}
		}
	},
	computed: {
		...mapState(['the_sujet'])
	},

	methods: {
		...mapActions(['setPostVisa']),
		envoyerVisa(id) {
			this.visa.post_id = id

			this.setPostVisa(this.visa)

			this.visa.les_remarques = ''

			//this.$router.push(`/sujet/${this.the_sujet[0].name}`)
			this.$router.push({
				name: 'post',
				params: {
					name: this.the_sujet[0].name
				}
			})
		}
	}
}
</script>

<style scoped>
</style>