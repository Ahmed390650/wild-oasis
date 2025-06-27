import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSetting } from "../../services/apiSettings"
import toast from "react-hot-toast"

const useSettingAdd = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: updateSetting,
        onSuccess() {
            toast.success("Setting is updated Successfully", { id: "create" });
            client.invalidateQueries({ queryKey: ["settings"] })
        },
        onError(error: Error) {
            toast.error(error.message, { id: "create" })
        },
    })
}

export default useSettingAdd
