'use client'
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "sonner"

type ResponseType = InferResponseType<typeof client.api.workspaces.join[":workspaceId"]["$post"], 200>
type RequestType = InferRequestType<typeof client.api.workspaces.join[":workspaceId"]["$post"]>

export const useJoinWorkspace = ()=>{
    const queryClient = useQueryClient();
    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn: async ({param, json})=>{
            const response = await client.api.workspaces.join[":workspaceId"]["$post"]({param, json})
            if(!response.ok){
                throw new Error("Failed to join workspace")
            }
            return await response.json();

        },
        onSuccess: ({data})=>{
            toast.success("Workspace joined");
            queryClient.invalidateQueries({ queryKey: ['workspaces']})
            queryClient.invalidateQueries({ queryKey: ['workspaces', data.$id]})
        },
        onError: ()=>{
            toast.error("Failed to join workspace")
        }
    })
    return mutation;
}