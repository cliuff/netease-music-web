<template>
  <v-app>
    <v-app-bar app color="grey darken-4" dark>
      <div
        class="d-flex align-center ms-md-16"
        style="cursor: pointer"
        @click="selNavLink = '/'"
      >
        <v-img
          alt="网易云音乐Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo_text.png"
          transition="scale-transition"
          height="35"
        />
      </div>

      <v-container class="mx-3">
        <v-btn
          text
          v-for="mainNavItem in mainNav"
          :key="mainNavItem.link"
          @click="selNavLink = mainNavItem.link"
        >
          <span class="grey--text darken-1">{{ mainNavItem.name }}</span>
        </v-btn>
      </v-container>

      <v-spacer></v-spacer>

      <v-avatar v-if="profile" size="36" class="me-md-16">
        <v-img :src="profile.image" :alt="profile.userName" />
      </v-avatar>
      <v-btn v-else text @click="doLoginAction" class="me-md-16">
        <span class="grey--text darken-1">登录</span>
      </v-btn>
      <v-dialog v-model="showLogin" persistent max-width="500px">
        <login v-model="showLogin" />
      </v-dialog>

      <template v-if="showSubNav" v-slot:extension>
        <v-tabs align-with-title background-color="red darken-3">
          <v-tabs-slider color="red darken-3"></v-tabs-slider>

          <v-tab
            v-for="item in subNav"
            :key="item.link"
            @click="selNavLink = item.link"
          >
            <span style="font-size: smaller">{{ item.name }}</span>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <div style="background-color: #f0f0f0">
        <router-view></router-view>
      </div>
      <v-footer>
        <v-container class="px-md-16">
          <p class="pa-0 ma-0">
            <a>
              <span style="font-size: smaller" class="grey--text darken-4">
                服务条款
              </span>
            </a>
            <span style="font-size: smaller" class="grey--text darken-4 mx-2">
              |
            </span>
            <a>
              <span style="font-size: smaller" class="grey--text darken-4">
                隐私政策
              </span>
            </a>
            <span style="font-size: smaller" class="grey--text darken-4 mx-2">
              |
            </span>
            <a>
              <span style="font-size: smaller" class="grey--text darken-4">
                儿童隐私政策
              </span>
            </a>
            <span style="font-size: smaller" class="grey--text darken-4 mx-2">
              |
            </span>
            <a>
              <span style="font-size: smaller" class="grey--text darken-4">
                版权投诉指引
              </span>
            </a>
            <span style="font-size: smaller" class="grey--text darken-4 mx-2">
              |
            </span>
            <a>
              <span style="font-size: smaller" class="grey--text darken-4">
                意见反馈
              </span>
            </a>
          </p>
          <p class="pa-0 ma-0">
            <span style="font-size: smaller" class="black--text lighten-5">
              网易公司版权所有©1997-2020
            </span>
          </p>
          <p class="pa-0 ma-0">
            <span style="font-size: smaller" class="black--text lighten-5">
              违法和不良信息举报电话：0571-89853516
            </span>
          </p>
        </v-container>
      </v-footer>
    </v-main>
    <v-divider></v-divider>

    <v-app-bar v-if="track" app bottom color="grey darken-4" dark>
      <v-container class="px-md-16 py-0">
        <v-row>
          <v-col style="max-width: 50px" class="pa-0">
            <v-img :src="track.cover" :alt="track.trackName" max-width="50px" />
          </v-col>
          <span class="text-h6 ms-5 my-auto">{{ track.trackName }}</span>
          <span
            style="font-size: smaller"
            class="ms-5 my-auto grey--text darken-4"
          >
            {{ track.artistName }}
          </span>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-skip-previous</v-icon>
          </v-btn>
          <v-btn icon v-if="isPlaying" @click="pausePlaying">
            <v-icon>mdi-pause-circle-outline</v-icon>
          </v-btn>
          <v-btn icon v-else @click="resumePlaying">
            <v-icon>mdi-play-circle-outline</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-skip-next</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-app-bar>
  </v-app>
</template>

<script>
import Login from "@/views/Login";
import { initLoginState, isSignedOut } from "@/scripts/login-utils";
import { linkRes } from "@/scripts/web-utils";
export default {
  name: "App",
  components: { Login },
  data: function() {
    return {
      showLogin: false,
      mainNav: [],
      subNav: [],
      profile: null,
      showSubNav: false,
      selNavLink: null,
      audio: null,
      isPlaying: false
    };
  },
  computed: {
    track: function() {
      return this.$store.state.track;
    }
  },
  watch: {
    showLogin: function() {
      if (this.showLogin) return;
      if (isSignedOut()) {
        this.profile = null;
      } else {
        this.getProfile();
      }
    },
    selNavLink: function() {
      if (this.selNavLink == null) return;
      this.$router.push(this.selNavLink);
      this.checkSubNav();
    },
    track: function() {
      this.playTrack();
    }
  },
  created() {
    initLoginState(this);
    this.getMainNav();
    this.getSubNav();
    this.checkSubNav();
    this.getProfile();
  },
  methods: {
    getMainNav: function() {
      this.mainNav = [
        {
          name: "发现音乐",
          link: "/"
        },
        {
          name: "我的音乐",
          link: "/my-collection"
        },
        {
          name: "朋友",
          link: "/friends"
        },
        {
          name: "商城",
          link: "/store"
        },
        {
          name: "音乐人",
          link: "/artist"
        },
        {
          name: "下载客户端",
          link: "/app"
        }
      ];
    },
    getSubNav: function() {
      this.subNav = [
        {
          name: "推荐",
          link: "/"
        },
        {
          name: "排行榜",
          link: "/charts"
        },
        {
          name: "歌单",
          link: "/playlists"
        },
        {
          name: "主播电台",
          link: "/radios"
        },
        {
          name: "歌手",
          link: "/artists"
        },
        {
          name: "新碟上架",
          link: "/latest"
        }
      ];
    },
    doLoginAction: function() {
      this.showLogin = true;
    },
    getProfile: function() {
      let userId = this.$store.state.userId;
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
    checkSubNav: function(doPass = false) {
      // $router.currentRoute 还未跳转
      if (!doPass && this.selNavLink == null) {
        setTimeout(() => this.checkSubNav(true), 500);
        return;
      }
      let selNavLink =
        this.selNavLink == null
          ? this.$router.currentRoute.path
          : this.selNavLink;
      let navMatch = this.subNav.filter(function(value) {
        return selNavLink === value.link;
      });
      this.showSubNav = navMatch.length > 0;
    },
    playTrack: function() {
      if (this.track == null) return;
      this.pausePlaying();
      this.audio = new Audio(this.track.audio);
      this.resumePlaying();
    },
    pausePlaying: function() {
      if (this.audio == null) return;
      this.audio.pause();
      this.isPlaying = false;
    },
    resumePlaying: function() {
      if (this.audio == null) return;
      this.audio.play();
      this.isPlaying = true;
    }
  }
};
</script>
