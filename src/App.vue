<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-container>
        <v-row justify="center" align="center">
          <v-col md="4" lg="3">
            <div class="d-flex align-center">
              <h3>REZERVASYON</h3>
            </div>
          </v-col>
          <v-col md="4" lg="3">
            <div class="d-flex justify-end align-center">
              <v-btn @click="resetState" right>SIFIRLA</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <booking-steps />
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
import BookingSteps from "./components/BookingSteps.vue";

export default {
  name: "App",
  components: {
    BookingSteps,
  },
  methods: mapMutations(["resetState"]),
};
</script>
