'use client';

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
    initialValues: {
        name: string;
    },
    code: string;
    workspaceId: string;
}

export const JoinWorkspaceForm = ({
    initialValues,
    code,
    workspaceId
}: JoinWorkspaceFormProps)=>{

    const router = useRouter()

    const {mutate, isPending} = useJoinWorkspace();
    const onSubmit = ()=>{
        mutate({
            param: {workspaceId},
            json: {code}
        },{
            onSuccess: ({data})=>{
                router.push(`/workspaces/${data.$id}`)
            }
        })
    }
    return(
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="p-7">
                <CardTitle className='text-xl font-bold'>
                    Join workspace
                </CardTitle>
                <CardDescription>
                    You &apos;ve been invited to join <strong>{initialValues.name}</strong> workspace
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <div className="gap-x-2 gap-y-2 flex lg:flex-row flex-col items-center justify-between">
                    <Button
                        className="w-full lg:w-fit"
                        variant="secondary"
                        type="button"
                        size='lg'
                    >
                        Cancel
                    </Button>
                    <Button
                        className="w-full lg:w-fit"
                        size='lg'
                        type="button"
                        onClick={onSubmit}
                        disabled={isPending}
                    >
                        Join Workspace
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}