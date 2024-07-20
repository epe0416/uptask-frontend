import { useParams } from "react-router-dom"
import { useQuery} from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"

export default function EditProjectView() {

    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    })

    console.log(data)
    console.log(isLoading)

    return (
        <div>EditProjectView</div>
    )
}
