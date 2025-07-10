import { useParams } from "next/navigation"

export const useTaskid = ()=>{
    const params = useParams();
    return params.taskId as string;
}
