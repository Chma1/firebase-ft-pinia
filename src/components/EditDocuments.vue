<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import router from '../router/router';
import { dataBaseStore } from '../store/colletionDataBase';
const useData = dataBaseStore()
const route = useRoute()
// console.log(route.params.id)

const title = ref('')
const example_link = ref('')
// const WriteDocuments=ref('')
const handleSumit = async() => {
   await useData.updateDocuments(route.params.id, title.value)
    router.push('/')
}
const backMenu = () => {
    router.push('/')
}
onMounted(async () => {
    title.value = await useData.readDocAlone(route.params.id)
})

</script>
<template>
    <div class="container">
        <div class="backMenu">
            <button class="waves-effect red btn-small " @click="backMenu()"> <i class="material-icons left">close</i>
                Cancelar</button>
        </div>
        <h5 class="center">Editar documento</h5>
        <div class="card-panel teal lighten-5">
            <form @submit.prevent="handleSumit()">
                <div class="row">
                    <div class="input-field col s12 l6">
                        <label for="title" class="active">Title</label>
                        <input type="text" id="title" v-model="title">
                    </div>
                    <div class="input-field col s12 l6">
                        <label for="url-1" class="active">URLS:</label>
                        <input type="url" id="url-1">
                    </div>
                    <div class="input-field col s12">
                        <textarea id="textarea1" class="materialize-textarea"></textarea>
                        <label for="textarea1" class="active">write documents</label>
                    </div>
                </div>
                <div class="center">
                    <button class="waves-effect waves-light btn-small ma1" type="submit"> <i
                            class="material-icons left">update</i>
                        Update</button>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
.ma1 {
    margin: 5px;
}

.backMenu {
    margin-bottom: 25px;
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
}
</style>