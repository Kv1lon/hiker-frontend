<template>
  <div class="preloader">
    <div class="preloader__image">
    </div>
</div>

  <div style="margin-bottom:70px">
    <div class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">

          <div   class="navbar-toggle"  data-target=".navbar-collapse">
          <ul class="nav navbar-nav">
                                                                <img class="nav-item" style="height:5vw; " src="@/assets/new-img/logo.svg"/>

            <li class="nav-item"><a class="nav-link" href='' @click.prevent="goTo('home',null)"> <font-awesome-icon :icon="['fas', 'home']" /></a></li>
            <li class="nav-item">
              <a class="nav-link" href="" @click.prevent="goTo('blog',null)"><font-awesome-icon :icon="['far', 'newspaper']" /></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="" @click.prevent="goTo('tickets')"><font-awesome-icon :icon="['fas', 'ticket-alt']" /></a>
            </li>

            <li class="nav-item"><a  href="" @click.prevent="goTo('contacts',null)"><font-awesome-icon :icon="['fas', 'phone']" /> </a></li>
            <li v-if="!isLoggedIn"><a  href="" @click.prevent="goTo('registration',null)"><font-awesome-icon :icon="['fas', 'user-plus']"/> </a></li>
            <li v-if="!isLoggedIn"><a  href="" @click.prevent="goTo('login',null)"><font-awesome-icon :icon="['fas', 'sign-in-alt']"/> </a></li>
            <li v-if="isLoggedIn" ><a  href="" @click.prevent="goTo('panel',null)"><font-awesome-icon :icon="['fas', 'briefcase']" /> </a></li>
            <li v-if="isLoggedIn" ><a  href="" @click.prevent="goTo('cabinet',{slug:$store.state.cuser.slug})"><font-awesome-icon :icon="['fas', 'clipboard']" /></a></li>

            <li v-if="isLoggedIn" ><a  href="" @click.prevent="goTo('profile',{slug: $store.state.cuser.slug})"><font-awesome-icon :icon="['fas', 'id-card']" /></a></li>
            <li v-if="isLoggedIn" ><a  href="" @click.prevent="logout" ><font-awesome-icon :icon="['fas', 'sign-out-alt']"/></a></li>
          </ul>
          </div>
        </div>

        <div class="navbar-collapse collapse">
                                      <img class="navbar-brand" style="height:60px; " src="@/assets/new-img/logo.svg"/>

          <ul class="nav navbar-nav">
            <li class="nav-item"><a class="nav-link" href='' @click.prevent="goTo('home',null)"> <font-awesome-icon :icon="['fas', 'home']" /> Головна</a></li>
                        <li class="nav-item"><a  href="" @click.prevent="goTo('contacts',null)"><font-awesome-icon :icon="['fas', 'phone']" /> Звязок</a></li>

            <li class="nav-item">
              <a class="nav-link" href="" @click.prevent="goTo('blog',null)"><font-awesome-icon :icon="['far', 'newspaper']" /> Статті</a>
            </li>
            <li v-if="isLoggedIn" ><a  href="" @click.prevent="goTo('cabinet',{slug:$store.state.cuser.slug})"><font-awesome-icon :icon="['fas', 'clipboard']" /> Мої статті</a></li>
            <li v-if="isLoggedIn" ><a  href="" @click.prevent="goTo('panel',null)"><font-awesome-icon :icon="['fas', 'briefcase']" /> Робочий кабінет</a></li>

                        <li class="nav-item">
              <a class="nav-link" href="" @click.prevent="goTo('tickets',)"><font-awesome-icon :icon="['fas', 'ticket-alt']" /> Білеты</a>
            </li>
            <li v-if="isLoggedIn" ><a  href="" @click.prevent="goTo('tickets_cabinet',{slug:$store.state.cuser.slug})"><font-awesome-icon :icon="['fas', 'plane-departure']" /> Мої билеты</a></li>

            <li v-if="!isLoggedIn"><a  href="" @click.prevent="goTo('registration',null)"><font-awesome-icon :icon="['fas', 'user-plus']"/> Регистрація</a></li>
            <li v-if="!isLoggedIn"><a  href="" @click.prevent="goTo('login',null)"><font-awesome-icon :icon="['fas', 'sign-in-alt']"/> Вхід</a></li>
            <li v-if="isLoggedIn" ><a  href="" @click.prevent="goTo('profile',{slug: $store.state.cuser.slug})"><font-awesome-icon :icon="['fas', 'id-card']" /> Профіль</a></li>
            <li v-if="isLoggedIn" ><a  href="" @click.prevent="logout" ><font-awesome-icon :icon="['fas', 'sign-out-alt']"/> Вихід</a></li>
          </ul>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
  import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
  window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 500);
  }

  export default {

    components:{'font-awesome-icon': FontAwesomeIcon},

    data(){return{}
    },
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      logout: function () {
          this.$store.dispatch('logout')
						.then(() => {
							let r = this.$router.resolve({
								name: 'home',
							})
							window.location.assign(r.href)})
						.catch(err => console.log(err))
      },

        goTo(name,params) {
        let r = this.$router.resolve({
								name: name,params: params
							})
							window.location.assign(r.href)

      }},

    created: function () {

      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch("logout")
          }
          throw err;
        });
      });
    }
  }

</script>
<style scoped>

  .preloader {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: #fff;
    z-index: 1001;
  }

  .preloader__image {
    position: relative;
    top: 50%;
    left: 50%;
    width: 64px;
    height: 64px;
    margin-top: -32px;
    margin-left: -32px;
    background: url('../assets/Walk.gif') no-repeat 50% 50%;
    /*расположение (url) изображения gif и др. параметры*/
  }

  .loaded_hiding .preloader {
    transition: 0.3s opacity;
    opacity: 0;
  }

  .loaded .preloader {
    display: none;
  }
  .navbar-nav{
    display: flex;
    float:right;
  }

</style>