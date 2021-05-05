<template>
  <ion-router-outlet />
</template>

<script>
import { IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonRouterOutlet,
  }
});
</script>
