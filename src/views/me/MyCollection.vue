<template>
  <v-container class="px-md-16 py-0">
    <v-row style="background-color: white">
      <v-divider vertical></v-divider>
      <v-col style="max-width: 250px" class="pa-0 py-4">
        <v-row
          v-for="(playlist, i) in playlists"
          :key="'tr_pl_' + i"
          style="max-width: 250px; cursor: pointer"
          class="px-10 py-1"
          @click="selPlaylist = playlist.playlistId"
        >
          <v-col style="max-width: 40px" class="pa-0">
            <v-img
              :src="playlist.cover"
              :alt="playlist.playlistName"
              max-width="40px"
            />
          </v-col>
          <v-col
            style="width: available"
            class="pa-0 ms-2 align-content-center"
          >
            <span style="font-size: smaller" class="d-block">
              {{ playlist.playlistName }}
            </span>
            <span style="font-size: smaller" class="d-block grey--text">
              {{ playlist.trackCounts }}首
            </span>
          </v-col>
        </v-row>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col>
        <playlist :playlist-id="selPlaylist" :key="selPlaylist" />
      </v-col>
      <v-divider vertical></v-divider>
    </v-row>
  </v-container>
</template>

<script>
import { linkRes } from "@/scripts/web-utils";
import Playlist from "@/components/Playlist";
import { processPlaylists } from "@/scripts/playlist-utils";

export default {
  name: "MyCollection",
  components: { Playlist },
  data: function() {
    return {
      playlists: [],
      selPlaylist: null,
      // 用户喜欢的歌曲歌单名
      playlistLike: null,
      otherPlaylists: []
    };
  },
  created() {
    this.getPlaylists();
  },
  methods: {
    getPlaylists: function() {
      let userId = this.$store.state.userId;
      let data = {
        params: {
          author: userId
        }
      };
      this.axios
        .get("/playlist/playlistByAuthor/", data)
        .then(response => {
          let re = response.data;
          if (re.code === "200") {
            this.playlists = linkRes(re.data, "cover");
            let processResult = processPlaylists(this.playlists);
            this.playlistLike = processResult.like;
            this.otherPlaylists = processResult.others;
            this.selPlaylist = this.playlistLike.playlistId;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
