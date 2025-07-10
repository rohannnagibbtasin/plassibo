'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { updateWorkspacesSchema } from "../schemas";
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ArrowLeftIcon, CopyIcon, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Workspace } from "../types";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { useResetInviteCode } from "../api/use-reset-invite-code";



interface EditWorkspaceFormProps {
    onCancel?: () => void;
    initialValue: Workspace
}

export const EditWorkspaceForm = ({ onCancel, initialValue }: EditWorkspaceFormProps) => {
    const router = useRouter();
    const { mutate, isPending } = useUpdateWorkspace();
    const { 
        mutate: deleteWorkspace, 
        isPending: isDeletingWorkspace 
    } = useDeleteWorkspace();
    const { 
        mutate: resetInviteCode, 
        isPending: isResettingInviteCode 
    } = useResetInviteCode();

    const [DeleteDialog, confirmDelete] = useConfirm(
        "Delete Workspace",
        "This action can't be reversed",
        "destructive"
    )
    const [ ResetDialog, confirmReset] = useConfirm(
        "Reset invite link",
        "This will invalidate the current invite link",
        "destructive"
    )
    const handleDelete = async()=>{
        const ok = await confirmDelete();
        if(!ok) return;
       deleteWorkspace({
        param: { workspaceId: initialValue.$id}
       },{
        onSuccess: ()=>{
            window.location.href = '/'
        }
       })
    }
    const handleResetInviteCode = async()=>{
        const ok = await confirmReset();
        if(!ok) return;
       resetInviteCode({
        param: { workspaceId: initialValue.$id}
       })
    }

    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof updateWorkspacesSchema>>({
        resolver: zodResolver(updateWorkspacesSchema),
        defaultValues: {
            ...initialValue,
            image: initialValue.imageUrl ?? ""
        }
    })
    const onSubmit = (values: z.infer<typeof updateWorkspacesSchema>) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : "",
        }
        mutate({
            form: finalValues,
            param: { workspaceId: initialValue.$id }
        }, {
            onSuccess: () => {
                form.reset({
                    ...values,
                    image: values.image instanceof File ? values.image : initialValue.imageUrl ?? ""
                });
            },
            onError: () => {
                form.reset();
            }
        })
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file)
        }
    }
    const fullInviteLink = typeof window !== 'undefined' ? `${window.location.origin}/workspaces/join/${initialValue.$id}/${initialValue.inviteCode}` : ''

    const handleCopyInviteLink = ()=>{
        navigator.clipboard.writeText(fullInviteLink)
            .then(()=>toast.success("Invite link copied to clipboard"))
    }

    return (
        <div className="flex flex-col gap-y-4">
            <DeleteDialog />
            <ResetDialog />
            <Card className="w-full h-full border-none shadow-none">
                <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
                    <Button className="cursor-pointer" size='sm' variant='secondary' onClick={onCancel ? onCancel : () => router.push(`/workspaces/${initialValue.$id}`)}>
                        <ArrowLeftIcon className="size-4" />
                        Back
                    </Button>
                    <CardTitle className="text-xl font-bold">
                        {initialValue.name}
                    </CardTitle>
                </CardHeader>
                <div className="px-7">
                    <DottedSeparator />
                </div>
                <CardContent className="p-7">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Workspace name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter workspace name"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-y-2">
                                            <div className="flex items-center gap-x-5">
                                                {
                                                    field.value ? (
                                                        <div className="size-[72px] relative rounded overflow-hidden">
                                                            <Image
                                                                src={
                                                                    field.value instanceof File
                                                                        ? URL.createObjectURL(field.value)
                                                                        : field.value
                                                                }
                                                                alt="Logo"
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <Avatar className="size-[72px]">
                                                            <AvatarFallback>
                                                                <ImageIcon className="size-[36px] text-neutral-500" />
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    )
                                                }
                                                <div className="flex flex-col">
                                                    <p className="flex flex-col">Workspace Icon</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        JPG, PNG, SVG or JPEG, max 1mb
                                                    </p>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept=".jpg, .png, .jpeg, .svg"
                                                        ref={inputRef}
                                                        disabled={isPending}
                                                        onChange={handleImageChange}
                                                    />
                                                    {field.value ? (
                                                        <Button
                                                            type="button"
                                                            disabled={isPending}
                                                            variant="destructive"
                                                            size="xs"
                                                            className="w-fit mt-2"
                                                            onClick={() => {
                                                                field.onChange(null);
                                                                if (inputRef.current) {
                                                                    inputRef.current.value = ''
                                                                }
                                                            }}
                                                        >
                                                            Remove Image
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            type="button"
                                                            disabled={isPending}
                                                            variant="teritrary"
                                                            size="xs"
                                                            className="w-fit mt-2"
                                                            onClick={() => inputRef.current?.click()}
                                                        >
                                                            Upload Image
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                            <DottedSeparator className="py-7" />
                            <div className="flex items-center justify-between">
                                <Button
                                    type="button"
                                    size='lg'
                                    variant='secondary'
                                    onClick={onCancel}
                                    disabled={isPending}
                                    className={cn(!onCancel && "invisible")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size='lg'
                                    disabled={isPending}
                                    className="cursor-pointer"
                                >
                                    Update Workspace
                                </Button>

                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Card className="w-full h-full border-none shadow-none">
                <CardContent className="p-7">
                    <div className="flex flex-col">
                        <CardTitle className="font-bold">Invite Members</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Use the invite link to add members to your workspace
                        </p>
                        <div className="mt-4">
                            <div className="flex items-center gap-x-2">
                                <Input disabled value={fullInviteLink} />
                                <Button 
                                    className="size-12 cursor-pointer"
                                    variant='secondary'
                                    onClick={handleCopyInviteLink} 
                                >
                                    <CopyIcon className="size-5" />
                                </Button>
                            </div>
                        </div>
                        <DottedSeparator className="py-7" />
                        <Button 
                        className="cursor-pointer mt-6 w-fit ml-auto" 
                        size='sm'
                        variant='destructive'
                        type="button"
                        disabled={isPending || isResettingInviteCode}
                        onClick={handleResetInviteCode}
                        >
                            Reset invite link
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full h-full border-none shadow-none">
                <CardContent className="p-7">
                    <div className="flex flex-col">
                        <CardTitle className="font-bold">Danger Zone</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Deleting a workspace is irreversible and will remove all associated data
                        </p>
                        <DottedSeparator className="py-7" />
                        <Button 
                        className="cursor-pointer mt-6 w-fit ml-auto" 
                        size='sm'
                        variant='destructive'
                        type="button"
                        disabled={isPending || isDeletingWorkspace}
                        onClick={handleDelete}
                        >
                            Delete workspace
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

