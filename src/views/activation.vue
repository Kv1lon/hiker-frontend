<template>
    <div v-if="loading" class="preloader">
    <div class="preloader__image">
    </div>
</div>
  <div class="page-content">
		<div data-aos="flip-up" data-aos-delay="100" data-aos-duration="1000" class="form-v5-content ">
                  <h4 class="form-detail">Активуйте свій аккаунт і у свободному доступі читайте і створюйте статті</h4>
                    <button @click="activate" class="btn btn-success act">Підтвердити</button>

		</div>
	</div>
</template>

<script>
	import axios from "axios";
    import {useToast} from "vue-toastification";

  export default {
		name: "activation",
    props:['uid','slug'],
    data:()=>({
		  loading:false,
        			toast : useToast()

    }),
		methods:{
			goTo() {this.$router.replace({ name: 'home'})
			},
    activate(){
			                  const formData = new FormData();
                                      formData.append("uid", this.uid);
                                      formData.append("token","JWT"+ this.slug);
                                      this.loading =true,
              axios({url:  this.$store.state.backendUrl+`auth/users/activation/`,data:formData, method: 'POST',headers: {'Content-type': 'application/json',}}).then(response => {
                this.loading= false
                  this.toast.success('Аккаунт успешно подтвержден')
                	let r = this.$router.resolve({
								name: 'home', // put your route information in
							})
							window.location.assign(r.href)
              }).catch(err=>{this.toast.error('Ошибка. Ваш токен устарел'), this.loading= false})
			}
    }}
</script>

<style scoped>
.act{
  display: flex;
  justify-content: space-around;
  margin-top: 5%;
  margin-bottom: 5%;
  margin-right: auto;
  margin-left: auto;
  width: 30%;
  font-size: 80%;
}
.form-detail{
  text-align: center;
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
    opacity: 50%;
  }
.form-v5-content{
    width: 30%;
}
</style>