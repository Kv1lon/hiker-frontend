<template>

  <div class="preloader">
    <div class="preloader__image">
    </div>
</div>

    <nav class="header__nav">
      <ul class="header__navbar">
        <li class="header__item">
          <a href="#" class="header__link">
            <transition name="slide-fade">
              <!-- Header Navigation Menu Icons -->
              <button class="header--button" v-if="show" key="on" @click="show = false">
                <svg viewBox="0 0 24 24" class="header--icon">
                  <title>Close</title>
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path fill="currentColor" d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                </svg>
              </button>
              <button class="header--button" v-else key="off" @click="show = true">
                <svg viewBox="0 0 24 24" class="header--icon">
                  <title>Navigation Menu</title>
                  <path fill="currentColor" d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z" />
                </svg>
              </button>
            </transition>
          </a>
          <!-- Dropdown Menu -->
          <transition name="dropdown">
            <div class="dropdown__menu" v-bind:class="{ active: show }" v-if="show">
              <ul class="dropdown__menu-nav">
                <li class="dropdown__menu-item">
                  <img class="dropdown__menu-text" style="height:60px; " src="@/assets/new-img/logo.svg"/>
</li>
                <li class="dropdown__menu-item">
                  <a @click.prevent="goTo('home',null)" href="#" class="dropdown__menu-link" title="Головна">
                    <div class="dropdown__menu-svg">
                      <font-awesome-icon :icon="['fas', 'home']" />
                    </div>
                    <div class="dropdown__menu-text">Головна</div>
                  </a>
                </li>
                <li class="dropdown__menu-item">
                  <a @click.prevent="goTo('blog',null)" href="#" class="dropdown__menu-link" title="Звязок">
                    <div class="dropdown__menu-svg">
<font-awesome-icon :icon="['fas', 'phone']" />
                    </div>
                    <div class="dropdown__menu-text">Звязок</div>
                  </a>
                </li>
                <li class="dropdown__menu-item">
                  <a @click.prevent="goTo('blog',null)" href="#" class="dropdown__menu-link" title="Privacy">
                    <div class="dropdown__menu-svg">
<font-awesome-icon :icon="['far', 'newspaper']" />
                    </div>
                    <div class="dropdown__menu-text">Статті</div>
                  </a>
                </li>
                <li v-if="isLoggedIn" class="dropdown__menu-item">
                  <a @click.prevent="goTo('cabinet',{slug:$store.state.cuser.slug})" href="#" class="dropdown__menu-link" title="Data &amp; personalization">
                    <div class="dropdown__menu-svg">
<font-awesome-icon :icon="['fas', 'briefcase']" />
                    </div>
                    <div class="dropdown__menu-text">Мої статті</div>
                  </a>
                </li>
                <li v-if="isLoggedIn" class="dropdown__menu-item">
                  <a @click.prevent="goTo('panel',null)" href="#" class="dropdown__menu-link" title="Data &amp; personalization">
                    <div class="dropdown__menu-svg">
<font-awesome-icon :icon="['fas', 'briefcase']" />
                    </div>
                    <div class="dropdown__menu-text">Кабінет</div>
                  </a>
                </li>
                <li class="dropdown__menu-item">
                  <a @click.prevent="goTo('tickets',)"  href="#" class="dropdown__menu-link" title="People &amp; sharing">
                    <div class="dropdown__menu-svg">
<font-awesome-icon :icon="['fas', 'ticket-alt']" />
                    </div>
                    <div class="dropdown__menu-text">Білети</div>
                  </a>
                </li>
                <li v-if="isLoggedIn" class="dropdown__menu-item">
                  <a  @click.prevent="goTo('tickets_cabinet',{slug:$store.state.cuser.slug})" href="#" class="dropdown__menu-link" title="Subscriptions">
                    <div class="dropdown__menu-svg">
<font-awesome-icon :icon="['fas', 'plane-departure']" />
                    </div>
                    <div class="dropdown__menu-text">Мої білети</div>
                  </a>
                </li>
                <li v-if="!isLoggedIn" class="dropdown__menu-item">
                  <a @click.prevent="goTo('registration',null)" href="#" class="dropdown__menu-link" title="Send feedback">
                    <div class="dropdown__menu-svg">
<font-awesome-icon :icon="['fas', 'user-plus']"/>
                    </div>
                    <div class="dropdown__menu-text">Реєстрація</div>
                  </a>
                </li>
                <li v-if="!isLoggedIn" class="dropdown__menu-item">
                  <a @click.prevent="goTo('login',null)" href="#" class="dropdown__menu-link" title="Send feedback">
                    <div class="dropdown__menu-svg">
<font-awesome-icon :icon="['fas', 'sign-in-alt']"/>                    </div>
                    <div class="dropdown__menu-text">Вхід</div>
                  </a>
                </li>
                <li v-if="isLoggedIn" class="dropdown__menu-item">
                  <a  @click.prevent="goTo('profile',{slug: $store.state.cuser.slug})" href="#" class="dropdown__menu-link" title="Send feedback">
                    <div class="dropdown__menu-svg">
<font-awesome-icon :icon="['fas', 'id-card']" />                  </div>
                    <div class="dropdown__menu-text">Профіль</div>
                  </a>
                </li>
                <li v-if="isLoggedIn"  class="dropdown__menu-item">
                  <a @click.prevent="logout" href="#" class="dropdown__menu-link" title="Send feedback">
                    <div class="dropdown__menu-svg">
<font-awesome-icon :icon="['fas', 'sign-out-alt']"/>                    </div>
                    <div class="dropdown__menu-text">Вихід</div>
                  </a>
                </li>
              </ul>
            </div>
          </transition>
        </li>
      </ul>
    </nav>

</template>

<script>
  import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
  import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";
  window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 500);}
  export default {
    name: 'NewNav',
        components:{'font-awesome-icon': FontAwesomeIcon},

    data() {
      return {
        show: false,
      }
    },
    mounted() {
    },
    computed: {
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

      },
        },
        created: function () {
      {

      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch("logout")
          }
          throw err;
        });
      });
    }},

  }
</script>

<style lang="scss">


// Global


body {
  font-size: 1rem;
  -webkit-text-size-adjust: 100%;
  font-family: var(--font-primary);
}

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

hr {
  border: 0;
  height: 0;
  margin: 1.5rem 0;
  border-top: 1px solid var(--color-gray);
}

// Header Menu
nav{
  z-index: 999;
  position: fixed;
  top: 20px;
  right: 20px;
}
ul,li{    list-style-type: none;
}
.header {
  padding: 2rem 5rem 2rem 5rem;

  &__navbar {
    align-items: center;
    justify-content: flex-end;
  }
  &__item {
    padding: 1rem;
  }
  &--icon {
    width: 3rem;
    height: 3rem;
  }
  &--button {
    right: 0;
    position: absolute;
    margin: 0;
    padding: 0;
    color: gray;
    cursor: pointer;
    border: 1px solid transparent;
    background-color: transparent;
    &:focus {
      outline: 0;
    }
  }
}

// Dropdown Menu

.dropdown__menu {
  top: 100%;
  right: 0;
  z-index: 10;
  height: auto;
      position: absolute;
  min-width: 300px;
  margin-top: 1rem;
  overflow-y:inherit;
  padding: 2rem 1rem 2rem 0rem;
  border-radius: 12px;
  background-color: #384452;
  background-clip: padding-box;
  &-link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    color: white;
    padding: 0.8rem 0 0.8rem 2rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    border-radius: 0 50px 50px 0;
    &:hover {
      color: #17bf63;
      background-color: rgba(79, 192, 141, 0.1);
    }
  }
  &-svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  &-text {
    font-weight: 300;
    margin-left: 1rem;
    margin-right: 1rem;
  }
}

// Animation Menu Icon

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.6s;
}
.slide-fade-enter,
.slide-fade-leave-active {
  opacity: 0;
}
.slide-fade-enter {
  transform: translateX(31px);
}
.slide-fade-leave-active {
  transform: translateX(-31px);
}

// Dropdown Menu Animation

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 1s;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

// Wrapper

.main {
  margin: 6rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &__subtitle {
    color: #4f5959;
    font-weight: 100;
    margin-bottom: 2rem;
  }
  &__link {
    margin-right: 1.5rem;
    display: inline-block;
    &:last-child {
      margin-right: 0;
    }
  }
  &__svg {
    width: 2rem;
    height: 2rem;
    opacity: 0.6;
    color: #94a2b0;
    &:hover {
      color: #ffad1f;
    }
  }
}
</style>
