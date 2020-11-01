<template>
  <div class="login">
    <div class="login-header box-shadow">
      <div
        class="container-fluid d-flex justify-content-between align-items-center"
      >
        <div class="brand-logo">
          <a href="login.html">
            <img src="vendors/images/deskapp-logo.svg" alt="" />
          </a>
        </div>
        <div class="login-menu">
          <ul>
            <li><a href="register.html">Register</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="login-wrap d-flex align-items-center flex-wrap justify-content-center"
    >
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 col-lg-7">
            <img src="vendors/images/login-page-img.png" alt="" />
          </div>
          <div class="col-md-6 col-lg-5">
            <div class="login-box bg-white box-shadow border-radius-10">
              <div class="login-title">
                <h2 class="text-center text-primary">Login To DeskApp</h2>
              </div>
              <form @submit.prevent="loginUser">
                <div class="input-group custom">
                  <input
                    v-model="form.data.email"
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Username"
                  />
                  <div class="input-group-append custom">
                    <span class="input-group-text"
                      ><i class="icon-copy dw dw-user1"></i
                    ></span>
                  </div>
                </div>
                <div class="input-group custom">
                  <input
                    v-model="form.data.password"
                    type="password"
                    class="form-control form-control-lg"
                    placeholder="**********"
                  />
                  <div class="input-group-append custom">
                    <span class="input-group-text"
                      ><i class="dw dw-padlock1"></i
                    ></span>
                  </div>
                </div>
                <div class="row pb-30">
                  <div class="col-6">
                    <div class="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="customCheck1"
                      />
                      <label class="custom-control-label" for="customCheck1"
                        >Remember</label
                      >
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="forgot-password">
                      <a href="forgot-password.html">Forgot Password</a>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="input-group mb-0">
                      <!--
                        use code for form submit
                        <input class="btn btn-primary btn-lg btn-block" type="submit" value="Sign In">
                      -->
                      <button
                        class="btn btn-primary btn-lg btn-block"
                        type="submit"
                      >
                        Sign In
                      </button>
                    </div>
                    <div
                      class="font-16 weight-600 pt-10 pb-10 text-center"
                      data-color="#707373"
                    >
                      OR
                    </div>
                    <div class="input-group mb-0">
                      <router-link
                        class="btn btn-outline-primary btn-lg btn-block"
                        to="/register"
                        >Register To Create Account</router-link
                      >
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",

  data() {
    return {
      form: {
        data: {
          email: "pjmessi10@gmail.com",
          password: "prajwal10",
        },
        errors: {
          email: "",
          password: "",
        },
      },
    };
  },

  methods: {
    ...mapActions(["login"]),

    loginUser: async function () {
      try {
        const credential = {
          email: this.form.data.email,
          password: this.form.data.password,
        };

        await this.login(credential);
 
      } catch (err) {

        const errorMessage = err.response.data.errors[0].message

        this.$Toast.fire({
          icon: "error",
          title: errorMessage,
        });
      }
    },
  },
};
</script>
