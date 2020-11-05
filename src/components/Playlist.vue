<template>
  <div>
    <v-row>
      <v-col style="max-width: 220px">
        <v-img :src="playlist.cover" max-width="220" />
      </v-col>
      <v-col>
        <v-row>
          <span class="text-h4">{{ playlistName }}</span>
        </v-row>
        <v-row class="my-2">
          <v-avatar v-if="profile" size="30" class="me-2">
            <v-img :src="profile.image" :alt="profile.userName" />
          </v-avatar>
          <span
            v-if="profile"
            class="me-2 my-auto blue--text darken-4"
            style="font-size: smaller"
          >
            {{ profile.userName }}
          </span>
          <span class="my-auto" style="font-size: smaller">
            {{ playlist.time }}
          </span>
        </v-row>
        <v-row>
          <span style="font-size: smaller" class="grey--text">
            标签：{{ playlist.genre }}
          </span>
        </v-row>
        <v-row>
          <span style="font-size: smaller" class="grey--text">
            介绍：{{ playlist.playlistDesc }}
          </span>
        </v-row>
      </v-col>
    </v-row>

    <span class="text-h5 mt-16 mb-4">歌曲列表</span>
    <span
      style="font-size: smaller"
      class="grey--text darken-4 mt-16 mb-4 ms-4"
    >
      {{ tracks.length }}首歌
    </span>
    <v-divider></v-divider>

    <!-- 歌曲列表 -->
    <v-container class="py-0">
      <v-row class="py-1">
        <v-col class="pa-0">
          <span style="font-size: medium" class="grey--text darken-4">
            歌曲标题
          </span>
        </v-col>
        <v-col class="pa-0">
          <span style="font-size: medium" class="grey--text darken-4">
            歌手
          </span>
        </v-col>
        <v-col class="pa-0">
          <span style="font-size: medium" class="grey--text darken-4">
            专辑
          </span>
        </v-col>
      </v-row>
      <v-row
        v-for="track in tracks"
        :key="track.trackId"
        style="cursor: pointer"
        class="py-1"
        @click="playTrack(track)"
      >
        <v-col class="pa-0">
          <span style="font-size: smaller" class="black--text lighten-5">
            {{ track.trackName }}
          </span>
        </v-col>
        <v-col class="pa-0">
          <span style="font-size: smaller" class="black--text lighten-5">
            {{ track.artistName }}
          </span>
        </v-col>
        <v-col class="pa-0">
          <span style="font-size: smaller" class="black--text lighten-5">
            {{ track.albumName }}
          </span>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { linkRes } from "@/scripts/web-utils";

export default {
  name: "Playlist",
  props: ["playlistId"],
  data: function() {
    return {
      playlist: null,
      tracks: [],
      profile: null
    };
  },
  computed: {
    playlistName: function() {
      return this.playlist.playlistName === "nemu-playlist-like"
        ? "我喜欢的音乐"
        : this.playlist.playlistName;
    }
  },
  created() {
    this.getInfo();
    this.getTracks();
  },
  methods: {
    getInfo: function() {
      let data = {
        params: {
          playlistId: this.playlistId
        }
      };
      this.axios
        .get("/playlist/infoById/", data)
        .then(response => {
          let re = response.data;
          if (re.code === "200") {
            this.playlist = linkRes([re.data], "cover")[0];
            this.getProfile();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTracks: function() {
      let data = {
        params: {
          playlistId: this.playlistId
        }
      };
      this.axios
        .get("/playlist/tracksByPlaylistId/", data)
        .then(response => {
          let re = response.data;
          if (re.code === "200") {
            this.tracks = linkRes(re.data, "cover");
            this.tracks = linkRes(this.tracks, "audio");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getProfile: function() {
      let userId = this.playlist.author;
      let data = {
        params: {
          userId: userId
        }
      };
      this.axios
        .get("/user/userInfo/", data)
        .then(response => {
          let re = response.data;
          if (re.code === "200") {
            this.profile = linkRes([re.data], "image")[0];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    playTrack: function(track) {
      this.$store.state.track = track;
    }
  }
};
</script>
