   
<script setup>
import { useMaterialize } from '../hooks/composable.js'
import { useUserStore } from '../store/pinia';
const { actvieMaterialize } = useMaterialize()
actvieMaterialize()

const useUser = useUserStore()

</script>

<template>
  <div class="container">
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

  </div>
</template>

<style  scoped></style>