import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { DB, auth } from "../hooks/firebase";
import { nanoid } from "nanoid";

export const dataBaseStore = defineStore("dataBase", {
  state: () => ({
    dataBase: [],
    loadingDocument: false,
  }),
  actions: {
    // Obtén varios documentos de una colección
    async getDocuments() {
      if (this.dataBase.length !== 0) {
        return;
      }
      this.loadingDocument = true;
      try {
        const q = query(
          collection(DB, "dataUser"),
          where("userID", "==", auth.currentUser.uid)
        );
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
          // console.log(doc.id,doc.data());
          this.dataBase.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => (this.loadingDocument = false), 500);
      }
    },
    // fireStore agregar datos
    async createDocuments(title, text, eurls) {
      this.loadingDocument = true;
      try {
        const objectDocuments = {
          title: title,
          eurls: eurls,
          text: nanoid(25),
          userID: auth.currentUser.uid,
        };
        const query = await addDoc(collection(DB, "dataUser"), objectDocuments);
        this.dataBase.unshift({
          // cuidado aqui ya que estamal escrito y genraba un error al eliminar
          id: query.id,
          ...objectDocuments,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDocument = false;
      }
    },
    // Borrar datos en firebase
    async deleteDocuments(id) {
      this.loadingDocument = true
      try {
        const docRef = doc(DB, "dataUser", id);
        const myDoc = await getDoc(docRef);
        if (!myDoc.exists()) {
          throw new Error("No existe el doc");
        }
        if (myDoc.data().user === auth.currentUser.uid) {
          throw new Error('No es su Doc')
        }
        await deleteDoc(docRef);
        if (this.dataBase.length) {
          alert('Seguro que quieres eliminar?')
          this.dataBase = this.dataBase.filter((item) => item.id != id);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setTimeout(() => this.loadingDocument = false, 500)
      }
    },
    // leer un  document
    async readDocAlone(id) {
      this.loadingDocument = true
      try {
        const docRef = doc(DB, "dataUser", id);
        const modifDoc = await getDoc(docRef);
        if (!modifDoc.exists()) {
          throw new Error("No existe el doc");
        }
        if (modifDoc.data().user === auth.currentUser.uid) {
          throw new Error('No es su Doc leeer un documento ')
        }
        return modifDoc.data().title
        // const { title, text, eurls } = modifDoc.data()
      } catch (error) {
        console.log(error.message);
      } finally {
        setTimeout(() => this.loadingDocument = false, 500)

      }
    },
    // actualizar documento solo un campo
    async updateDocuments(id, title) {
      this.loadingDocument = true
      try {
        const docRef = doc(DB, "dataUser", id);
        const modifDoc = await getDoc(docRef);
        if (!modifDoc.exists()) {
          throw new Error("No existe el doc");
        }
        if (modifDoc.data().user === auth.currentUser.uid) {
          throw new Error('No es su Doc')
        }
        console.log(modifDoc);
        await updateDoc(docRef, {
          title: title
        })
        // regresas todo el objeto
        this.dataBase = this.dataBase.map(item => item.id === id ? ({ ...item, title: title }) : item)
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => this.loadingDocument = false, 500)
      }
    }

  },
  getters: {},
});
