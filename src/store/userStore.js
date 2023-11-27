import { defineStore } from "pinia";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../hooks/firebase";
import router from '../router/router.js'
import { dataBaseStore } from "./colletionDataBase.js";

export const useUserStore = defineStore("User", {
  state: () => ({
    userData: null,
    loadingData: false,
    loadingUser: false,
    // toast: `<span>email o usuario invalido</span><button class="btn-flat toast-action "><i class="material-icons left">error</i></button>`,
  }),
  actions: {
    // Registar al usuario
    async registerUser(email, password) {
      this.loadingUser = true
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        router.push('/')
        this.userData = {
          email: user.email,
          uid: user.uid,
        };
      } catch (error) {
        console.log(error.code)
        if (error.code === "auth/invalid-email") {
          return M.toast({
            html: `<span>email o usuario invalido</span>
            <button class="btn-flat toast-action ">
            <i class="material-icons left">error</i>
            </button>`,
            classes: "rounded",
            outDuration: 500,
            displayLength: 1000,
            inDuration: 500,
          });
        }
        if (error.code = 'auth/email-already-in-use') {
          return M.toast({
            html: `<span>email o usuario ya en uso</span>
            <button class="btn-flat toast-action ">
            <i class="material-icons left">error</i>
            </button>`,
            classes: "rounded",
            outDuration: 500,
            displayLength: 1000,
            inDuration: 500,
          });
        }
      } finally {
        setTimeout(() => this.loadingUser = false, 500)
      }
    },

    // iniciar sesion
    async signUser(email, password) {
      this.loadingUser = true
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        router.push('/')
        this.userData = {
          email: user.email,
          uid: user.uid,
        };
        // console.log(user)
      } catch (error) {
        console.log(error.code)
        if (error.code === "auth/invalid-email" || error.code === 'auth/invalid-login-credentials') {
          return M.toast({
            // html: this.toast,
            html: 'Datos no validos',
            classes: "rounded",
            outDuration: 500,
            displayLength: 1000,
            inDuration: 500,
          });
        }
      } finally {
        setTimeout(() => this.loadingUser = false, 500)

      }
    },
    // Cerrar sesion
    async closeAccount() {
      const dataBase = dataBaseStore()
      this.loadingData = true
      try {
        M.toast({
          html: 'Hasta pronto',
          classes: "rounded",
          outDuration: 500,
          displayLength: 1000,
          inDuration: 500,
        })
        await signOut(auth)
        console.log(signOut(auth));
      } catch (error) {
        console.log(error.code)
      } finally {
        dataBase.$reset()
        this.userData = {}
        setTimeout(() => this.loadingData = false, 500)
        router.push('/login')
      }
    },

    // Observable
    currentsUser() {
      let unsubscribe;
      return new Promise((resolve, reject) => {
        unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            this.userData = { email: user.email, uid: user.uid };
          } else {
            this.userData = null;
          }
          resolve(user);
        });
      }).then((user) => {
        unsubscribe();
        return user;
      });
    },
  },
  getters: {},
}
);