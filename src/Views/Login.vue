<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/pinia'
import LoadingComponent from '../components/LoadingComponent.vue';
// import { useRouter } from 'vue-router';
// const router = useRouter()

const useUser = useUserStore()
const signEmail = ref('')
const signPassword = ref('')

const signIn =  () => {
 useUser.signUser(signEmail.value, signPassword.value)
};

</script>
<template>
  <div class="container" >
    <LoadingComponent v-if="useUser.loadingData"/>
    <div class="row" v-else>
      <div class="col s12 m8 l12 center  blue-grey card z-depth-5">
        <div class="card-title white-text">
          <h4>Login</h4>
        </div>
        <div class="divider black"></div>
        <form class="col s12 " @submit.prevent="signIn">
          <div class="input-field col s12">
            <input type="email" class="validate" placeholder="Correo" v-model.trim="signEmail">
          </div>
          <div class="input-field col s12">
            <input type="password" class="validate" placeholder="Password" v-model.trim="signPassword">
          </div>
          <div class="btn_margin">
            <button class="btn waves-effect teal darken-1" :disabled="useUser.loadingData">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>



<style scoped>
.card {
  margin-top: 25px;
}

.container {
  display: flex;
  justify-content: center;
}

.btn_margin {
  margin-bottom: 18px;
}
</style>