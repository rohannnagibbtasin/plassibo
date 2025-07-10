'use client';

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import { useInviteCode } from "@/features/workspaces/hooks/use-invite-code";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const JoinWorkspaceClient = () => {
    const workspaceId = useWorkspaceId();
    const inviteCode = useInviteCode();
    const { data: initialValue, isLoading } = useGetWorkspaceInfo({ workspaceId })
    if (isLoading) {
        return <PageLoader />
    }
    if (!initialValue) {
        return <PageError message="Task not found" />
    }
    return (
        <div className='w-full lg:max-w-xl'>
            <JoinWorkspaceForm initialValues={initialValue} code={inviteCode} workspaceId={workspaceId} />
        </div>
    )
}