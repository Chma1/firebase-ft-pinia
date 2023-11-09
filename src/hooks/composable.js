import { onMounted } from "vue";
import M from "materialize-css";

export const useMaterialize = () => {
  const actvieMaterialize = () => {
    onMounted(() => M.AutoInit());
  };
  return {
    actvieMaterialize,
  };
};
