<template>
    <div class="container mtb">
        <div class="row">
            <div data-aos="fade-in" data-aos-delay="300" class="col-lg-8">
                <h4>Звяжіться з нами!</h4>
                <div class="hline"></div>
                <p>Для звязку с нашою компанією щодо реклами, співпраці, повідомленні про проблеми з  сайтом заповніть дану форму.</p>
    <div class="form-group"><input type="name" name="name" class="form-control" placeholder="Ваше имя"  v-model="name" >
        <span v-if="msg.name">{{msg.name}}</span>
    </div>
    <div class="form-group">
        <input type="email" name="email" class="form-control"  placeholder="Ваш email"  v-model="email">
        <span v-if="msg.email">{{msg.email}}</span>

    </div>
    <div class="form-group">
        <input type="text" name="subject" class="form-control"  placeholder="Тема"  v-model="subject">
        <span v-if="msg.subject">{{msg.subject}}</span>

    </div>

    <div class="form-group">
        <textarea class="form-control" name="message"  placeholder="Сообщение" rows="5" data-rule="required" data-msg="Please write something for us" v-model="message"></textarea>
        <span v-if="msg.message">{{msg.message}}</span>

    </div>


    <button class="btn btn-large" @click.prevent="send_mail">Відправити</button>
    </div>
            <div data-aos="slide-right" data-aos-delay="200" class="col-lg-4">
        <h4>Наша адреса</h4><div class="hline"></div><p>
          Бэйкер-стріт , 221б,<br/> 49099, Дніпро,<br/>Україна.<br/></p>
        <p>Email: hello@hiker.com<br/> Тел: +380 96-8493-4893
        </p>
        <p>У відділені нашої компанії Вам допоможуть обрати найкращий тур</p>
      </div>
    </div>
  </div>
</template>

<script>
    import axios from "axios";
    import {useToast} from "vue-toastification";

    export default {
        name: "contact",
        data: () => ({
            subject:"",
            message:"",
            name:"",
            email:"",
            msg:[],
            toast : useToast()

        }),
        watch: {
      message(value){
        // binding this to the data value in the email input
        this.message = value;
        this.validateText(value,'message',20);
      },
        subject(value){
        // binding this to the data value in the email input
        this.subject = value;
        this.validateText(value,'subject',5);
      },
            name(value){
        // binding this to the data value in the email input
        this.name = value;
        this.validateText(value,'name',1);
      },
              email(value){
        // binding this to the data value in the email input
        this.email = value;
        this.validateEmail(value);
      },},

        methods:{
            send_mail(){
                if(!this.msg['message'] && !this.msg['name']&& !this.msg['email']&& !this.msg['subject']){
                const formData = new FormData();
                formData.append("subject", this.subject);
                formData.append("message", this.message);
                formData.append("name", this.name);
                formData.append("email", this.email);
                axios({url:  this.$store.state.backendUrl+`api/v1/send_mail`,data:formData, method: 'POST'}).then(response => {console.log(response)
                    this.toast.success(" Отправлено ")
                })
                .catch(err => {this.toast.error(" Відбулася помилка. Введіть валідні данні або спрбуйте пізніше ")})}
                                else {
                this.toast.error(" Відбулася помилка. Введіть валідні данні або спрбуйте пізніше  ")
                }
                                },
validateText(value, ob,chars){
        let difference = chars - value.length;
        if (value.length<chars) {
          this.msg[ob] = `Повинно бути ${chars} символів! `+ difference + ' залишилось символів' ;
        } else {
          this.msg[ob] = '';
        }},
            validateEmail(value){
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
  {
    this.msg['email'] = '';
  } else{
    this.msg['email'] = 'Це не схоже на email';
  }
    },
            }
    }
</script>

<style scoped>

</style>