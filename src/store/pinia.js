import { defineStore } from "pinia";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../hooks/firebase";
import { useRouter } from "vue-router";


export const useUserStore = defineStore("User", {
  state: () => ({
    userData: null,
    loadingData: false,
    loadinfUser: false,
    // toast: `<span>email o usuario invalido</span><button class="btn-flat toast-action "><i class="material-icons left">error</i></button>`,
    router: useRouter()
  }),
  actions: {
    // Registar al usuario
    async registerUser(email, password) {
      this.loadingData = true
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        this.router.push('/')
        this.userData = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName
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
        this.loadingData = false
      }
    },

    // iniciar sesion
    async signUser(email, password) {
      this.loadingData = true
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        this.router.push('/')
        this.userData = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName
        };
        console.log(user)
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
        this.loadingData = false
      }
    },
    // Cerrar sesion
    async closeAccount() {
      this.loadinfUser = true
      try {
        await signOut(auth)
        M.toast({
          html: 'Hasta pronto',
          classes: "rounded",
          outDuration: 500,
          displayLength: 1000,
          inDuration: 500,
        })
      } catch (error) {
        console.log(error.code)
      } finally {
        this.userData = {}
        this.loadinfUser = false
        this.router.push('/login')
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