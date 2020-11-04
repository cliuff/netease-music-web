<template>
  <div>
    <v-container class="px-md-16">
      <div class="px-4 py-2 mt-4">
        <v-btn text @click="selGenre = null">
          <span class="grey--text darken-1 text-h6 font-weight-medium">
            全部
          </span>
        </v-btn>
        <v-btn
          text
          v-for="genre in genres"
          :key="genre"
          @click="selGenre = genre"
        >
          <span class="grey--text darken-1 text-h6 font-weight-medium">
            {{ genre }}
          </span>
        </v-btn>
      </div>
      <v-divider inset="true"></v-divider>
      <v-row>
        <div
          v-for="(playlist, i) in playlists"
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
import { stringify } from "@/scripts/http-utils";

export default {
  name: "Playlists",
  data: function() {
    return {
      genres: [],
      selGenre: null,
      playlists: []
    };
  },
  created() {
    this.getGenres();
    this.getPlaylists();
  },
  watch: {
    selGenre: function() {
      this.getPlaylists(this.selGenre);
    }
  },
  methods: {
    getGenres: function() {
      this.axios
        .get("/playlist/categary/")
        .then(response => {
          let re = response.data;
          if (re.code === "200") {
            this.genres = re.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getPlaylists: function(genre = null) {
      let isByGenre = genre != null;
      let url = isByGenre ? "/playlist/playlistByGenre/" : "/playlist/play/";
      let data = {
        page: 0,
        limit: 35
      };
      if (isByGenre) data.genre = this.selGenre;
      this.axios
        .post(url, stringify(data))
        .then(response => {
          let re = response.data;
          if (re.code === "200") {
            this.playlists = linkRes(re.data, "cover");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
