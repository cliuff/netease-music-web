<template>
  <div>
    <v-carousel
      cycle
      height="285"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="'ca_' + i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">
              <v-img :src="slide" height="285" contain />
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <v-container class="px-md-16 py-0">
      <v-row style="background-color: white">
        <v-divider vertical></v-divider>
        <v-col class="py-4">
          <div class="px-4 py-2">
            <span class="text-h6 font-weight-medium">热门推荐</span>
          </div>
          <v-divider></v-divider>
          <v-row class="ma-0 px-3">
            <div
              v-for="(playlist, i) in trendingPlaylists"
              :key="'tr_pl_' + i"
              style="max-width: 162px; cursor: pointer"
              class="mx-2 mt-4 px-3"
              @click="showPlaylist(playlist.playlistId)"
            >
              <v-img
                :src="playlist.cover"
                :alt="playlist.playlistName"
                max-width="150px"
              />
              <span
                :title="playlist.playlistName"
                style="font-size: smaller"
                class="black--text lighten-5 mt-4"
              >
                {{ playlist.playlistName }}
              </span>
            </div>
          </v-row>
        </v-col>
        <v-divider vertical></v-divider>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { linkRes } from "@/scripts/web-utils";

export default {
  name: "Recommended",
  data: function() {
    return {
      colors: [],
      slides: [],
      trendingPlaylists: []
    };
  },
  created() {
    this.getCarousels();
    this.getTrendingPlaylists();
  },
  methods: {
    getCarousels: function() {
      this.axios
        .get("/playlist/lunbo/")
        .then(response => {
          let re = response.data;
          if (re.code === "200") {
            let resultData = linkRes(re.data, "image");
            this.slides = resultData.map(function(carousel) {
              return carousel.image;
            });
            this.colors = resultData.map(function(carousel) {
              return carousel.color;
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTrendingPlaylists: function() {
      this.axios
        .get("/playlist/")
        .then(response => {
          let re = response.data;
          if (re.code === "200") {
            this.trendingPlaylists = linkRes(re.data, "cover");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    showPlaylist: function(playlistId) {
      this.$router.push("/playlist/" + playlistId);
    }
  }
};
</script>
