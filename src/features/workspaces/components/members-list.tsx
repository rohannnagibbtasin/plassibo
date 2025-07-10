'use client'
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-workspace";
import { MembersAvatar } from "@/features/members/components/members-avatar";
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteMember } from "@/features/members/api/use-delete-members";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { MemberRole } from "@/features/members/types";
import { useConfirm } from "@/hooks/use-confirm";

export const MembersList = () => {
    const workspaceId = useWorkspaceId()
    const {data} = useGetMembers({workspaceId});

    const [ConfirmDialog, confirm] = useConfirm(
        'Remove member',
        'This member will be removed from the workspace',
        'destructive'
    )

    const {mutate: deleteMember, isPending: isDeletingMember} = useDeleteMember()
    const {mutate: updateMember, isPending: isUpdateMember} = useUpdateMember()

    const handleUpdateMember = async(memberId: string, role: MemberRole)=>{
        updateMember({
            json: {role},
            param: {memberId}
        })
    }

    const handleDeleteMember = async (memberId: string)=>{
        const ok = await confirm();
        if(!ok) return;
        deleteMember({param: {memberId}},{
            onSuccess: ()=>{
                window.location.reload()
            }
        })
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <ConfirmDialog />
            <CardHeader className="flex flex-row p-7 gap-y-0  gap-x-4 items-center">
                <Button asChild variant='secondary' size='sm'>
                    <Link href={`/workspaces/${workspaceId}`}>
                        <ArrowLeftIcon className="size-4 mr-2" />
                        Back
                    </Link>
                </Button>
                <CardTitle className="text-xl font-bold">
                    Members List
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                {
                    data?.documents.map((member, index)=>(
                        <Fragment key={member.$id}>
                            <div className="flex items-center gap-2">
                                <MembersAvatar 
                                    className="size-10"
                                    name={member.name}
                                    fallbackClassName="text-lg"
                                />
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium">{member.name}</p>
                                    <p className="text-xs text-muted-foreground">{member.email}</p>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            className="ml-auto"
                                            variant='secondary'
                                            size='icon'
                                        >
                                            <MoreVerticalIcon className="size-4 text-muted-foreground" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="bottom" align="end">
                                        <DropdownMenuItem 
                                            className="font-medium"
                                            disabled={isUpdateMember}
                                            onClick={()=>handleUpdateMember(member.$id, MemberRole.ADMIN)}
                                        >
                                            Set as Administrator
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                            className="font-medium"
                                            disabled={isUpdateMember}
                                            onClick={()=>handleUpdateMember(member.$id, MemberRole.MEMBER)}
                                        >
                                            Set as Member
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                            className="font-medium text-amber-700"
                                            disabled={isDeletingMember}
                                            onClick={()=>handleDeleteMember(member.$id)}
                                        >
                                            Remove {member.name}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            {
                                index < data.documents.length -1 && (
                                    <Separator className="my-2.5" />
                                )
                            }
                        </Fragment>
                    ))
                }
            </CardContent>
        </Card>
    )
}
