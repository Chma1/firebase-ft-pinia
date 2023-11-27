<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/userStore";
import LoadingComponent from "../components/LoadingComponent.vue";
// import M from "materialize-css";

const userStore = useUserStore();
const registerName = ref("");
const registerEmail = ref("teste@correo.com");
const registerPassword = ref("");

const restForm = () => {
    registerEmail.value = "";
    registerPassword.value = "";
    registerName.value = "";
}
const handleSubmit = () => {
    userStore.registerUser(registerEmail.value, registerPassword.value);
        restForm()
};

</script>

<template>
    <div class="container">
        <LoadingComponent v-if="userStore.loadingData"/>
        <div class="row" v-else>
            <div class="col s12 m8 l8 center blue-grey card z-depth-5">
                <div class="card-title white-text">
                    <h4>Register</h4>
                </div>
                <div class="divider black"></div>
                <form class="col s12" @submit.prevent="handleSubmit">
                    <div class="input-field col s12">
                        <input placeholder="Name" v-model.trim="registerName" type="text" class="validate" />
                    </div>
                    <div class="input-field col s12">
                        <input type="email" class="validate" placeholder="Correo" v-model.trim="registerEmail" />
                    </div>
                    <div class="input-field col s12">
                        <input type="password" class="validate" placeholder="Password" v-model.trim="registerPassword" />
                    </div>
                    <div class="btn_margin">
                        <button class="btn waves-effect teal darken-1">
                            create account
                        </button>
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
