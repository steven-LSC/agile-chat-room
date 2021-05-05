<template>
  <ion-page>
    <ion-content>
      <slot />
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonPage,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({

  props:['pageTitle'],
  components: {
    IonContent,
    IonPage,
  },
});
</script>