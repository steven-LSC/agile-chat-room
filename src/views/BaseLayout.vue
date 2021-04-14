<template>
  <ion-page>
    <!-- <ion-header>
      <ion-toolbar>
        <ion-title style="text-align: center">{{pageTitle}}</ion-title>
      </ion-toolbar>
    </ion-header> -->
    <ion-content>
      <slot />
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  // IonHeader,
  IonPage,
  // IonTitle,
  // IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({

  props:['pageTitle'],
  components: {
    IonContent,
    // IonHeader,
    IonPage,
    // IonTitle,
    // IonToolbar,
  },
});
</script>