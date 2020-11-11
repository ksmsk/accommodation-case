<template>
  <v-row>
    <v-date-picker v-model="dates" range></v-date-picker>
  </v-row>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "DateStep",
  methods: mapMutations(["selectCheckInDate", "selectCheckOutDate"]),
  computed: {
    dates: {
      get() {
        return [
          this.$store.state.checkInDate,
          this.$store.state.checkOutDate,
        ].filter(Boolean);
      },
      set(value) {
        this.selectCheckInDate(value[0]);
        this.selectCheckOutDate(value[1]);
      },
    },
  },
};
</script>