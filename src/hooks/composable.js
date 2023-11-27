import { onMounted, ref } from "vue";
import M from "materialize-css";
export const useMaterialize = () => {
  const actvieMaterialize = () => {
    onMounted(() => M.AutoInit());
  };
  return {
    actvieMaterialize,
  };
};
export const useShowForm = () => {
  const openForm = ref(false)
  const showForm = () => {
    openForm.value = !openForm.value
  }
  return {
    showForm,
    openForm
  }
}