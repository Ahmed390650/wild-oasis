import { useQuery } from "@tanstack/react-query"
import { getSettings } from "../../services/apiSettings"

const useSetting = () => {
    return useQuery({
        queryFn: getSettings,
        queryKey: ["settings"]
    })
}

export default useSetting
