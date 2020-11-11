<template>
  <v-form ref="form">
    <v-container class="pa-0">
      <v-row>
        <v-col>
          <v-text-field
            label="Kart Sahibi"
            :rules="cardNameRules"
            hide-details="auto"
            v-model="form.cardName"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Kart Numarası"
            :rules="cardNumberRules"
            hide-details="auto"
            v-mask="'#### #### #### ####'"
            v-model="form.cardNumber"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            :rules="cardExpiresRules"
            :items="months"
            label="Ay"
            v-model="form.cardMonth"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            :rules="cardExpiresRules"
            :items="years"
            label="Yıl"
            v-model="form.cardYear"
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            @focus="flipper(true)"
            @blur="flipper(false)"
            label="CVV"
            :rules="cardCvvRules"
            hide-details="auto"
            v-mask="'###'"
            v-model="form.cardCvv"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>


<script>
import { bus } from "../main";

export default {
  props: {
    flipper: Function,
  },
  data: () => ({
    cardExpiresRules: [(value) => !!value || "Bu alan gerekli."],
    cardNameRules: [(value) => !!value || "Bu alan gerekli."],
    cardNumberRules: [
      (value) => !!value || "Bu alan gerekli.",
      (value) => value?.length === 19 || "Geçerli bir kart numarası girin.",
    ],
    cardCvvRules: [
      (value) => !!value || "Bu alan gerekli.",
      (value) => value?.length === 3 || "Geçerli bir cvv numarası girin.",
    ],
  }),
  computed: {
    form: {
      get() {
        return this.$store.state.payment;
      },
      set(value) {
        return this.$store.commit("changePayment", value);
      },
    },
    months() {
      return Array.from({ length: 12 }, (_, i) =>
        i >= 9 ? `${i + 1}` : `0${i + 1}`
      );
    },
    years() {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 10 }, (_, i) => "" + (currentYear + i));
    },
  },
  mounted() {
    bus.$on("reset-state", () => this.$refs.form.resetValidation());
  },
};
</script>

