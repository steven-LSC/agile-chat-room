<template>
  <base-layout>
    <h1 style="text-align: center; margin-top:20vh;">選擇你要進入的聊天室</h1>
    <section style="margin-top:40px;">
      <ion-button @click="choose('movie')" color="tertiary" expand="block" >電影</ion-button>
      <ion-button @click="choose('date')" color="tertiary" expand="block" >約會</ion-button>
      <ion-button @click="choose('workout')" color="tertiary" expand="block">運動</ion-button>
    </section>
  </base-layout>
</template>

<script>
export default {
  methods:{
    choose(room){
      this.$router.push(`/home/${room}`);
    }
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