
<script setup>
import LoadingComponent from '../components/LoadingComponent.vue'
import CreateDocuments from '../components/CreateDocuments.vue';
import ShowDocuments from '../components/showDocuments.vue'
import { useMaterialize, useShowForm } from '../hooks/composable.js'
const { actvieMaterialize } = useMaterialize()
actvieMaterialize()
import { useUserStore } from '../store/userStore';
import { dataBaseStore } from '../store/colletionDataBase';
const useData=dataBaseStore()
const useUser = useUserStore()
const { showForm, openForm } = useShowForm()

</script>

<template>
  <LoadingComponent v-if="useUser.loadingUser" />
  <div class="container" v-else>
    <div class="card-panel">
      <div class="row">
        <div class="card-image col s4 l2">
          <img class="responsive-img circle" src="../assets/cafe.JPG" alt="img">
        </div>
        <div class="col s8 l10">
          <span class="grey-text col s12 right">ID:{{ useUser.userData.uid }}</span>
          <span class="blue-text col s12 ">email:{{ useUser.userData.email }}</span>

        </div>
      </div>
      <div class="divider"></div>
      <span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo eum officia recusandae commodi libero, dolore
        mollitia modi quas autem esse itaque rem aperiam officiis nostrum dicta ad enim nam quos.
      </span>
    </div>
<!-- mostrar documents -->
    <ShowDocuments />
    <button class="waves-effect white btn-small btn-active " 
    :class="{ 'black-text': !openForm, 'red-text': openForm }"
      @click="showForm" ><span>
        <i class="material-icons right">description</i>
        {{ !openForm ? 'abrir formulario' : 'cerrar formulario' }}</span></button>
        <!-- crear documento -->
    <CreateDocuments v-if="openForm" />
  </div>
</template>

<style scoped>
.btn-active {
  margin-bottom: 10px;
}

</style>