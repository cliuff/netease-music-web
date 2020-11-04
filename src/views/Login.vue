<template>
  <v-card>
    <v-card-title class="grey darken-4 py-1">
      <span class="white--text text-md-body-1 font-weight-bold">登录</span>
      <v-spacer></v-spacer>
      <v-btn icon color="white" @click="closeDialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-container style="max-width: 250px" class="mx-auto pt-5">
        <v-text-field
          v-model="userName"
          key="userName"
          filled
          label="用户名"
          class="mt-3"
          style="max-width: 220px"
          hide-details="auto"
        ></v-text-field>
        <v-text-field
          v-model="password"
          key="password"
          filled
          label="密码"
          class="mt-3"
          style="max-width: 220px"
          hide-details="auto"
        ></v-text-field>
        <v-btn
          width="220px"
          class="blue darken-4 white--text mt-6"
          @click="login(userName, password)"
        >
          登录
        </v-btn>
      </v-container>
    </v-card-text>

    <v-snackbar v-model="showMessage">{{ message }}</v-snackbar>
  </v-card>
</template>

<script>
import { stringify } from "@/scripts/http-utils";

export default {
  name: "Login",
  props: ["value"],
  data: function() {
    return {
      userName: "",
      password: "",
      showMessage: false,
      message: ""
    };
  },
  methods: {
    closeDialog: function() {
      this.$emit("input", false);
    },
    login: function(userName, pwd) {
      let context = this;
      let data = {
        userId: userName,
        password: pwd
      };
      context.axios
        .post("/user/", stringify(data))
        .then(response => {
          let re = response.data;
          if (re.code === "200") {
            context.closeDialog();
          } else if (re.code === "000407") {
            context.message = re.msg;
            context.showMessage = true;
          } else {
            context.message = "失败";
            context.showMessage = true;
          }
        })
        .catch(error => {
          console.log(error);
          context.message = "失败";
          context.showMessage = true;
        });
    }
  }
};
</script>
