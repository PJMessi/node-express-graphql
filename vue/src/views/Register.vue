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
            <li><router-link to="/login">Login</router-link></li>
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
                <h2 class="text-center text-primary">Register</h2>
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
                        Sign Up
                      </button>
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
export default {
  name: "Register",

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
    loginUser: function () {
      const credential = {
        email: this.form.data.email,
        password: this.form.data.password,
      };

      const requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${credential.email}", password: "${credential.password}"}) {
              _id, email
            }
          }
        `
      }

      this.$axios({url: 'http://localhost:3000/graphql', data: JSON.stringify(requestBody), method: 'POST', headers: {'Content-Type': 'application/json'} })
      .then(res => {
        console.log(res)
      })
      .catch((err) => { 
        console.log(err.response)
        this.$Toast.fire({ icon: 'error', title: 'Something went wrong. Please try again later.' });
      })

      console.log(credential);
    },
  },
};
</script>
