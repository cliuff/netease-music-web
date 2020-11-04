<template>
  <v-app>
    <v-app-bar app color="grey darken-4" dark class="px-md-16">
      <div class="d-flex align-center">
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
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
        >
          <span class="grey--text darken-1">发现音乐</span>
        </v-btn>
        <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
        >
          <span class="grey--text darken-1">我的音乐</span>
        </v-btn>
        <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
        >
          <span class="grey--text darken-1">朋友</span>
        </v-btn>
        <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
        >
          <span class="grey--text darken-1">商城</span>
        </v-btn>
        <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
        >
          <span class="grey--text darken-1">音乐人</span>
        </v-btn>
        <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
        >
          <span class="grey--text darken-1">下载客户端</span>
        </v-btn>
      </v-container>

      <v-spacer></v-spacer>

      <v-btn text @click="doLoginAction">
        <span class="grey--text darken-1">登录</span>
      </v-btn>
      <v-dialog v-model="showLogin" persistent max-width="500px">
        <login v-model="showLogin" />
      </v-dialog>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="item in subNav" :key="item.link">
            {{ item.name }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item">
            <v-card color="basil" flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </template>
    </v-app-bar>

    <v-main>
      <div>
        <router-view></router-view>
        <v-footer class="px-md-16">
          网易云音乐
        </v-footer>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Login from "@/views/Login";
export default {
  name: "App",
  components: { Login },
  data: function() {
    return {
      showLogin: false,
      subNav: []
    };
  },
  created() {
    this.getSubNav();
  },
  methods: {
    getSubNav: function() {
      let context = this;
      context.subNav = [
        {
          name: "推荐",
          link: ""
        },
        {
          name: "排行榜",
          link: ""
        },
        {
          name: "歌单",
          link: ""
        },
        {
          name: "主播电台",
          link: ""
        },
        {
          name: "歌手",
          link: ""
        },
        {
          name: "新碟上架",
          link: ""
        }
      ];
    },
    doLoginAction: function() {
      this.showLogin = true;
    }
  }
};
</script>
