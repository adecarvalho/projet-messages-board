<template>
    <v-container>
      <v-layout align-center justify-center row fill-height wrap>
        <v-flex xm12 sm6 v-off v-for="sujet in sujets" :key="sujet.id">
          <v-card  class="ma-3">
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{sujet.name}}</h3>
                  <div> {{sujet.description}}</div>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn 
                :to="{name:'post',
                params:{name:sujet.name}}"
                
                color="primary">
                Ouvrir
                </v-btn>
              </v-card-actions>
          </v-card>
        </v-flex>   
    </v-layout>
    </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
	name: "sujets",
	mounted() {
		this.init()
	},
	computed: {
		...mapState(["sujets"])
	},
	methods: {
		...mapActions(["init"])
	}
}
</script>

