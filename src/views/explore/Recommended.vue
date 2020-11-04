<template>
  <div>
    <v-carousel
      cycle
      height="300"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="'ca_' + i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">
              <v-img :src="slide" />
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <v-container class="px-md-16">
      <div class="px-4 py-2 mt-4">
        <span class="text-h6 font-weight-medium">热门推荐</span>
      </div>
      <v-divider inset="true"></v-divider>
      <v-row>
        <div
          v-for="(playlist, i) in trendingPlaylists"
          :key="'tr_pl_' + i"
          style="max-width: 150px"
          class="mx-2 mt-4"
        >
          <div>
            <v-img
              :src="playlist.cover"
              :alt="playlist.playlistName"
              max-width="150px"
            />
            <div></div>
            <a :title="playlist.playlistName"></a>
          </div>
          <p class="playlist-item-desc">
            <a :title="playlist.playlistName">
              {{ playlist.playlistName }}
            </a>
          </p>
        </div>
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
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: [],
      trendingPlaylists: []
    };
  },
  created() {
    this.getTrendingPlaylists();
    this.getCarousels();
  },
  methods: {
    getCarousels: function() {
      let context = this;
      context.axios
        .get("/playlist/lunbo/")
        .then(response => {
          let re = response.data;
          if (re.code === "200") {
            context.slides = linkRes(re.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTrendingPlaylists: function() {
      let context = this;
      context.axios
        .get("/playlist/")
        .then(response => {
          let re = response.data;
          if (re.code === "200") {
            context.trendingPlaylists = linkRes(re.data, "cover");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.playlist-item-desc {
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
  word-break: break-word;
  list-style: none;
  line-height: 1.4;
  padding: 0;
  width: 100%;
  margin: 8px 0 3px;
  font-size: 14px;
}
</style>
