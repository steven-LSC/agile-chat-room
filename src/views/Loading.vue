<template>
  <Details v-if="chatroom !== null" @back="back" :room="room"></Details>

  <base-layout v-else-if="room !== null">
  <h1 id="out" style="text-align: center; margin-top:20vh;">尋找{{ roomName }}聊天室中.</h1>
    <section style="margin-top:40px;">
      <ion-button @click="$emit('back')" color="tertiary" expand="block" >取消</ion-button>
    </section>
  </base-layout>

  <Home v-else></Home>
</template>

<script>
import Details from './Details';
import Home from './Home';
import { IonButton} from "@ionic/vue";
export default {
  components:{
    Details,
    Home,
    IonButton,
  },
  data(){
    return{
      chatroom: null,
      timeOutId: 0,
      timer: 0
    }
  },
  inject: ["room"],
  computed: {
     roomName() {
      console.log("room = ",this.room);
      const map = {
        workout: "運動",
        date: "約會",
        movie: "電影",
      };
      return map[this.room];
    },
  },
  methods:{
    findchat(){
      this.chatroom = this.room;
    },
    back(){
      this.room = null;
    },
    clearTimer(){
      clearTimeout(this.timeOutId);
      this.chatroom = "find";
    },
    setTimer(){
      var output = document.getElementById("out");
      this.timeOutId = setInterval(() => {
        if(this.timer>=2){
          this.clearTimer();
        }
        output.innerHTML += ".";
        this.timer+=1;
      }, 1000);
    }
  },
  mounted(){
    this.setTimer();
  }
}
</script>

<style scoped>
:root {
  --ion-safe-area-top: 20px;
  --ion-safe-area-bottom: 22px;
}

ion-button{
  margin-top: 20px;
  font-size: 20px;
}

header {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 1.25em;
  text-transform: uppercase;
}

section {
  margin-top: 1em;
  margin-bottom: 2.5em;
}

section:not(.full-width),
.full-width > header {
  padding: 0 10px;
}
</style>