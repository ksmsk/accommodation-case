<template>
  <v-container>
    <v-row justify="center">
      <v-col md="8" lg="6">
        <v-stepper v-model="step" vertical>
          <v-stepper-step edit-icon="✔" :complete="step > 1" step="1" editable>
            Konaklanacak Tarih
            <small v-if="formattedDate">{{ formattedDate }}</small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <date-step />
            <v-btn color="primary" @click="step++" :disabled="!firstStepIsDone">
              Devam
            </v-btn>
          </v-stepper-content>

          <v-stepper-step
            edit-icon="✔"
            :complete="step > 2"
            step="2"
            :editable="firstStepIsDone"
          >
            Oda Tipi / Oda Manzarası
            <small v-if="formattedRoom">{{ formattedRoom }}</small>
          </v-stepper-step>

          <v-stepper-content step="2">
            <room-step />
            <v-btn
              color="primary"
              @click="step++"
              :disabled="!secondStepIsDone"
            >
              Devam
            </v-btn>
            <v-btn text @click="step--"> Geri </v-btn>
          </v-stepper-content>

          <v-stepper-step
            edit-icon="✔"
            :complete="step > 3"
            step="3"
            :editable="firstStepIsDone && secondStepIsDone"
          >
            Kart Bilgileri
          </v-stepper-step>

          <v-stepper-content step="3">
            <payment-details-step />
            <v-btn
              color="primary"
              @click="step++"
              :disabled="
                !firstStepIsDone || !secondStepIsDone || !thirdStepIsDone
              "
            >
              Devam
            </v-btn>
            <v-btn text @click="step--"> Geri </v-btn>
          </v-stepper-content>

          <v-stepper-step
            :complete="step > 4"
            step="4"
            :editable="firstStepIsDone && secondStepIsDone && thirdStepIsDone"
          >
            Rezervasyonu Tamamla
          </v-stepper-step>

          <v-stepper-content step="4">
            <checkout-step />
            <v-btn color="primary" @click="checkout"> Rezervasyon Yap </v-btn>
            <v-btn text @click="step--"> Geri </v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-col>
    </v-row>
    <checkout-success-modal />
  </v-container>
</template>

<script>
import DateStep from "./DateStep.vue";
import RoomStep from "./RoomStep.vue";
import PaymentDetailsStep from "./PaymentDetailsStep.vue";
import CheckoutSuccessModal from "./CheckoutSuccessModal";
import CheckoutStep from "./CheckoutStep.vue";
import { mapGetters } from "vuex";
import { setObject } from "../utils/helpers";

export default {
  name: "BookingStep",
  components: {
    DateStep,
    RoomStep,
    PaymentDetailsStep,
    CheckoutStep,
    CheckoutSuccessModal,
  },
  data() {
    return {
      checkedOut: false,
    };
  },
  methods: {
    checkout() {
      this.$store.commit("checkout");
      this.checkedOut = true;
    },
  },
  computed: {
    state() {
      return this.$store.state;
    },
    ...mapGetters([
      "firstStepIsDone",
      "secondStepIsDone",
      "thirdStepIsDone",
      "formattedDate",
      "formattedRoom",
    ]),
    step: {
      get() {
        return this.$store.state.step;
      },
      set(value) {
        this.$store.commit("changeStep", value);
      },
    },
  },
  watch: {
    state: {
      deep: true,
      handler(value) {
        setObject("state", value);
      },
    },
  },
};
</script>
