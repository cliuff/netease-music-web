<template>
  <div>
    <v-container class="px-md-16 py-0">
      <v-row style="background-color: white">
        <v-divider vertical></v-divider>
        <v-col class="py-4">
          <div class="px-4 py-2">
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
          <v-divider></v-divider>
          <v-row class="ma-0 px-3">
            <div
              v-for="(playlist, i) in playlists"
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
          <v-pagination
            v-model="pageNum"
            :length="pageCount"
            circle
          ></v-pagination>
        </v-col>
        <v-divider vertical></v-divider>
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
      playlists: [],
      pageNum: 1,
      pageCount: 0
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
      let limit = 35;
      let data = {
        page: this.pageNum - 1,
        limit: limit
      };
      if (isByGenre) data.genre = this.selGenre;
      this.axios
        .post(url, stringify(data))
        .then(response => {
          let re = response.data;
          if (re.code === "200") {
            this.playlists = linkRes(re.data, "cover");
            let remainder = this.playlists.length % limit;
            let offset = remainder !== 0 ? 1 : 0;
            this.pageCount =
              (this.playlists.length - remainder) / limit + offset;
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
