<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col>
        <payment-details-form :flipper="flipper" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-none d-md-block">
        <credit-card
          :cardName="card.cardName"
          :cardNumber="card.cardNumber"
          :cardMonth="card.cardMonth"
          :cardYear="card.cardYear"
          :cardCvv="card.cardCvv"
          :isFlipped="flipped"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreditCard from "./CreditCard.vue";
import PaymentDetailsForm from "./PaymentDetailsForm.vue";
import { mapState } from "vuex";

export default {
  name: "PaymentStep",
  components: { CreditCard, PaymentDetailsForm },
  data: () => ({
    flipped: false,
  }),
  methods: {
    flipper(status) {
      this.flipped = status;
    },
  },
  computed: mapState({
    card: (state) => state.payment,
  }),
};
</script>