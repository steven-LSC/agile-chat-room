<template>
  <base-layout>
    <ion-list>
      <ion-item router-link="/home/movie">電影</ion-item>
      <ion-item router-link="/home/date">約會</ion-item>
      <ion-item router-link="/home/workout">運動</ion-item>
    </ion-list>
  </base-layout>
</template>

<script>
import {
  IonList,
  IonItem,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    IonList,
    IonItem,
  },
});
</script>

<style scoped>
:root {
  --ion-safe-area-top: 20px;
  --ion-safe-area-bottom: 22px;
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