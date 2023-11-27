<script setup>
import { dataBaseStore } from '../store/colletionDataBase';
import { ref } from 'vue';
const getDocument = dataBaseStore()

const title = ref('')
const example_link = ref('')
const WriteDocuments = ref('')

const resetForm = () => {
    title.value = ""
    example_link.value = ""
    WriteDocuments.value = ""
}
const saveDoc = () => {
    getDocument.createDocuments(title.value, WriteDocuments.value, example_link.value)
    resetForm()
}

</script>

<template>
    <div class="center-align">
        <h5 class="h2">
            Crear Documento
        </h5>
    </div>
    <div class="card-panel teal lighten-5">
        <form @submit.prevent="saveDoc">
            <div class="row">
                <div class="input-field col s12 l6">
                    <label for="title">Title</label>
                    <input type="text" id="title" v-model="title">
                </div>
                <div class="input-field col s12 l6">
                    <label for="url-1">URLS:</label>
                    <input type="url" id="url-1" v-model="example_link">
                </div>
                <div class="input-field col s12">
                    <textarea id="textarea1" class="materialize-textarea" v-model="WriteDocuments"></textarea>
                    <label for="textarea1">write documents</label>
                </div>
            </div>
            <div class="center">
                <button class="waves-effect waves-light btn-small" type="submit"> <i class="material-icons left">save</i>
                    Save</button>
            </div>
        </form>
    </div>
</template>

<style scoped></style>