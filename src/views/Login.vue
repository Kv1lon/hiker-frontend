<template>
	<div class="page-content">
		<div data-aos="flip-up" data-aos-delay="100" data-aos-duration="1000" class="form-v5-content">
			<form class="form-detail" @submit.prevent="login">
				<h2>Вхід</h2>
				<div class="form-row">
					<label for="full-name">Email</label>
					<input type="text" v-model="email" name="full-name" id="full-name" class="input-text" placeholder="Імя користувача" required>
				</div>
				<div class="form-row">
					<label for="password">Пароль</label>
					<input type="password"  v-model="password" name="password" id="password" class="input-text" placeholder="Пароль" required>
				</div>

				<div class="form-row-last">
					<input type="submit" name="register" class="register" value="Вход">
				</div>
			</form>

		</div>
	</div>
</template>
<script>

	import  {useToast} from "vue-toastification";

  export default {
		name: "login",
		data: () => ({
			email:'',
			password:'',
			backend:  this.$store.state.backendUrl+`auth/token/login/`,
			toast : useToast()
		}),
created() {
},
	  methods: {

			async login() {
				let email = this.email
				let password = this.password
				 await this.$store.dispatch('login', { email, password })

						.catch(err => {console.log(err), this.toast.error("Ви неправильно ввели електронну пошту або пароль")})
				var token =  this.$store.state.access
								 await this.$store.dispatch('set_user',  token)
						.then(() => {
							let r = this.$router.resolve({
								name: 'home', // put your route information in
							})
							window.location.assign(r.href)})
						.catch(err => {console.log(err), this.toast.error("Ви неправильно ввели електронну пошту або пароль")})
			},


		}}
</script>
