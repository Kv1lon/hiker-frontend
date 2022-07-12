<template>
      <div v-if="loading" class="preloader">
    <div class="preloader__image">
    </div></div>
	<div class="page-content">
		<div data-aos="flip-up" data-aos-delay="100" data-aos-duration="1000" class="form-v5-content">
			<form class="form-detail" @submit.prevent="resetPassword">
				<h2>Зміна паролю</h2>
				<div class="form-row">
					<label for="full-name">Старий пароль</label>
					<input type="password" v-model="current_password" name="full-name" id="full-name" class="input-text" placeholder="Старый пароль" required>
				</div>
				<div class="form-row">
					<label for="password">Новий пароль</label>
					<input type="password"  v-model="new_password" name="password" id="password" class="input-text" placeholder="Новый пароль" required>
				</div>
				<div class="form-row-last">
					<input type="submit" name="reset" value="Изменить">
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import {useToast} from "vue-toastification";

export default {
  name: "reset_password",
  props:['uid','slug'],
  data:()=>({
    current_password:'',
    new_password:'',
    loading:false,
	  toast : useToast()
  }),
  methods:{
    resetPassword(){
    	if(this.new_password === this.current_password){
    		this.toast.error('Ноовий пароль не може співпадати зі старим')
		}
    	else{
      const formData = new FormData();
                                      formData.append("uid", this.uid)
                                      formData.append("token", this.slug)
                                      formData.append("new_password", this.new_password)
                                      formData.append("current_password", this.current_password)
                                      this.loading =true
              axios({url: this.$store.state.backendUrl+`auth/users/set_password/`,data:formData, method: 'POST',headers: {'Content-type': 'application/json',}}).then(response => {
                console.log(response)
              }).catch(err => {	
				  this.toast.error('Ошибка')
			  })
      const formData1 = new FormData();
                                      formData1.append("uid", this.uid)
                                      formData1.append("token", this.slug)
                                      formData1.append("new_password", this.new_password)
                                      this.loading =true
              axios({url: this.$store.state.backendUrl+`auth/users/reset_password_confirm/`,data:formData1, method: 'POST',headers: {'Content-type': 'application/json',}}).then(response => {
                console.log(response)
                this.loading= false
                  this.toast.success('Пароль змінено')
                	let r = this.$router.resolve({
								name: 'home', // put your route information in
							})
							window.location.assign(r.href)
              }).catch(err => {this.toast.error('Помилка!')
})
    }
  }}

}
</script>

<style scoped>

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
</style>