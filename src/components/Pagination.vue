<template><div class="pag">
                <ul class="pagination">
                        <li v-if="prev != null" class="page-item">
      <span @click ="changePage(prev)" style="cursor:pointer;" class="page-link">Минула</span>
    </li>
    <li v-if="prev != null & next != null" class="page-item"><a class="page-link">|</a></li>

    <li v-if="next != null" class="page-item">
      <a style="cursor:pointer;" @click ="changePage(next)" class="page-link" >Наступна</a>
    </li>
  </ul>
               </div>
</template>

<script>

    export default {
        name: "Pagination",
        props:['next','prev','searchq','limit'],
        data: () => ({
            currenturl:``,
        }),
        created() {
            this.currenturl =this.$store.state.backendUrl+`api/v1/blog?city=&country=&date=&search=${this.searchq}&tags=`
        },
        methods:{
            changePage(url){
                this.currenturl = url;
                this.$emit('page-changed',url)
             window.scrollTo(0,0);}
        }
    }
</script>

<style scoped>
.pag{
    font-size:20px;
text-align: center;
}
</style>