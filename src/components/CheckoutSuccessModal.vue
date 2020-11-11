<template>
  <v-dialog v-model="$parent.checkedOut" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Rezervasyon Başarılı
      </v-card-title>

      <v-card-text class="mt-5">
        Konsoldan request data'yı inceleyebilirsiniz.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$parent.checkedOut = false"
          >Kapat</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {};
</script>