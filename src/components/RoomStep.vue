<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col>
        <v-card flat>
          <p>Oda Tipi</p>
          <v-radio-group v-model="roomType">
            <v-radio label="Standart" value="standart" />
            <v-radio label="Deluxe" value="deluxe" />
            <v-radio label="Suit" value="suit" />
          </v-radio-group>
        </v-card>
      </v-col>
      <v-col>
        <v-card flat>
          <p>Oda Manzarası</p>
          <v-radio-group v-model="roomView">
            <v-radio label="Deniz" value="deniz" />
            <v-radio label="Kara" value="kara" />
          </v-radio-group>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "RoomStep",
  methods: mapMutations(["selectRoomType", "selectRoomView"]),
  computed: {
    roomType: {
      get() {
        return this.$store.state.roomType;
      },
      set(value) {
        this.selectRoomType(value);
      },
    },
    roomView: {
      get() {
        return this.$store.state.roomView;
      },
      set(value) {
        this.selectRoomView(value);
      },
    },
  },
};
</script>