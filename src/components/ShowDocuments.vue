<script setup>
import { dataBaseStore } from '../store/colletionDataBase';
const docBase = dataBaseStore()
import { useRouter } from 'vue-router';

const router=useRouter()

// importante hacer el llamado del metodo
docBase.getDocuments()
</script>
<template>
   
    <div class="card-panel light-green lighten-4" v-if="docBase.dataBase.length == 0">
        <h4 class="par-1 center">Aun vacío</h4>
    </div>
    <div class="contenido" v-else>
        <div class="center">
            <h5 class="h2">Mis Documents</h5>
        </div>
        <div class="card-panel lime lighten-4" v-for="(item,index) in docBase.dataBase" :key="index">
            <div class="row">
                <div class="col s12 l2"><b>Titulo:</b><br> <span>{{ item.title }} </span> </div>
                <div class="col s12 l3"><b>Description:</b> <br><span>{{ item.text }} </span></div>
                <div class="col s12 l5 ">
                    <b> URL:</b> <br>
                    <span>{{ item.eurls }}</span>
                    <!-- <span>{{ item }}</span> -->

                </div>
                <div class="col s12 l2 card-action center">
                    <button class="waves-effect red btn-floating" @click="docBase.deleteDocuments(item.id)">
                        <i class="small material-icons left">delete</i>
                    </button>
                    <button class="waves-effect yellow btn-floating ma1" @click="router.push(`/edit/${item.id}`)">
                        <i class="small material-icons left">edit</i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.ma1 {
    margin: 5px;
}
.par-1{
margin-top: -5px;
}

</style>