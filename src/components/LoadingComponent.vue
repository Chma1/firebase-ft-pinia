<script setup>
import { useMaterialize } from '../hooks/composable';
const { actvieMaterialize } = useMaterialize()
actvieMaterialize()

</script>

<template>
  <div class="container">
    loading.....

    <div class="progress">
      <div class="indeterminate"></div>
  </div>
   
  </div>
</template>

<style lang="scss" scoped></style>
