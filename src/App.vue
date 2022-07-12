<template>
  <div id="app">
    <div id="nav">
    <Nav />
    </div>
    <router-view/>
    <Footer />

  </div>

</template>

<style scoped>

   @import "https://fonts.googleapis.com/css?family=Raleway:400,700,900|Lato:400,900";

   @import "assets/new-lib/bootstrap/css/bootstrap.min.css";

   @import "assets/new-lib/font-awesome/css/font-awesome.min.css";
   @import "assets/new-lib/prettyphoto/css/prettyphoto.css";

   @import "assets/new-css/style.css";

</style>
<script>

    import Nav from "./components/Nav.vue";
    import Footer from "./components/Footer.vue";
        import {useToast} from "vue-toastification";

    export default {
        components: {Nav,Footer},
        data() {
            return {
                          toast : useToast()

            }
        },
created() {
              this.refresh()
  },
		methods: {
			 async refresh() {
               let refresh = this.$store.state.refresh;
					this.$store.dispatch('refresh', { refresh })
				   .catch(err => console.log(err))
               				var token =  this.$store.state.access
								 await this.$store.dispatch('set_user',  token)
						.catch(err => {console.log(err)})
			 }
				},
    }
</script>