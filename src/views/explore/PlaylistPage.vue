<template>
  <v-container class="px-md-16 py-0">
    <v-row style="background-color: white">
      <v-divider vertical></v-divider>
      <v-col>
        <playlist v-if="id" :playlist-id="id" />
      </v-col>
      <v-divider vertical></v-divider>
    </v-row>
  </v-container>
</template>

<script>
import Playlist from "@/components/Playlist";
export default {
  name: "PlaylistPage",
  components: { Playlist },
  data: function() {
    return {
      id: this.$route.params.id
    };
  }
};
</script>
