<template>
  <v-row>
    <v-date-picker
      :allowed-dates="allowedDates"
      v-model="dates"
      range
    ></v-date-picker>
  </v-row>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "DateStep",
  methods: {
    allowedDates: (val) => {
      const currentDate = new Date().toISOString().split("T")[0];
      return val > currentDate;
    },
    ...mapMutations(["selectCheckInDate", "selectCheckOutDate"]),
  },
  computed: {
    dates: {
      get() {
        return [
          this.$store.state.checkInDate,
          this.$store.state.checkOutDate,
        ].filter(Boolean);
      },
      set(value) {
        const checkIn = value[0] > value[1] ? value[1] : value[0];
        const checkOut = value[0] > value[1] ? value[0] : value[1];
        this.selectCheckInDate(checkIn);
        this.selectCheckOutDate(checkOut);
      },
    },
  },
};
</script>