<script setup>
import { useMaterialize } from '../hooks/composable';

const {actvieMaterialize}=useMaterialize()
actvieMaterialize()

</script>

<template>
  <div class="container">
    loading.....
    <div class="spinner-layer spinner-green">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped></style>
