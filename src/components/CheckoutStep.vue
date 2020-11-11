<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="font-weight-bold">Giriş Tarihi</td>
                <td>{{ readableDate(state.checkInDate) }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">Çıkış Tarihi</td>
                <td>{{ readableDate(state.checkOutDate) }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">Oda Tipi</td>
                <td>{{ state.roomType }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">Oda Manzarası</td>
                <td>{{ state.roomView }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { readableDate } from "../utils/helpers";

export default {
  name: "PaymentStep",
  data: () => ({
    flipped: false,
  }),
  methods: {
    readableDate,
    flipper(status) {
      this.flipped = status;
    },
  },
  computed: {
    ...mapState({
      state: (state) => state,
    }),
  },
};
</script>