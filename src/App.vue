<script setup>
// import { RouterLink } from 'vue-router';
import { useMaterialize } from './hooks/composable.js'
import { dataBaseStore } from './store/colletionDataBase';
import { useUserStore } from './store/userStore';
const { actvieMaterialize } = useMaterialize()

actvieMaterialize()

const useDataStore = dataBaseStore()
const useUser = useUserStore()

</script>

<template>
    <nav class="teal darken-3 mb-2">
        <div class="nav-wrapper">
            <div class="container">
                <router-link class="brand-logo" to="/">App Baset</router-link>
                <a data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    <div>
                        <li><router-link class="waves-effect cyan lighten-1 btn-small" to="/register"
                                v-if="!useUser.userData"><i class="material-icons right">person</i>Register</router-link>
                        </li>
                        <li><router-link class="waves-effect waves-light btn-small" to="/login" v-if="!useUser.userData"><i
                                    class="material-icons right">login</i> Login</router-link></li>
                    </div>
                    <div>
                        <li><a class="waves-effect waves-light yellow darken-3 btn-small" @click="useUser.closeAccount"
                                v-if="useUser.userData"><i class="material-icons right">close</i>
                                Cerrar sesión
                            </a></li>
                    </div>
                </ul>
                <ul class="sidenav hide-on-large-only" id="mobile-demo">
                    <div class="s12 center">
                        <h6 class="teal-text"> Menu</h6>
                    </div>
                    <li><a>Lorem</a></li>
                    <li><a class="left"><i class="material-icons right">person</i>Register</a></li>
                    <li><a class="center"><i class="material-icons right">login</i>Login</a></li>

                </ul>
            </div>
        </div>
    </nav>
    <router-view></router-view>
</template>

<style scoped></style>
