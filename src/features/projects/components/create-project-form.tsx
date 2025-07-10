'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {  useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { createProjectSchema } from "../schema";
import { useCreateProject } from "../api/use-create-project";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useRouter } from "next/navigation";


interface CreateWorkspaceFormProps {
    onCancel?: ()=>void;
}

export const CreateProjectForm = ({ onCancel }: CreateWorkspaceFormProps)=>{
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const { mutate, isPending } = useCreateProject();

    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof createProjectSchema>>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: "",
            workspaceId: ''
        }
    })
    const onSubmit = (values: z.infer<typeof createProjectSchema>)=>{
        const finalValues = {
            ...values,
            workspaceId,
            image: values.image instanceof File ? values.image : "",
        }
        mutate({form: finalValues}, {
            onSuccess: ({data})=>{
                form.reset();
                router.push(`/workspaces/projects/${workspaceId}/${data.$id}`); 
            },
            onError: ()=>{
                toast('Failed to create project');
                form.reset();
            }
        })

    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file){
            form.setValue("image", file)
        }
    }

    return(
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Create a new project
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
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>
                                            Project name
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                placeholder="Enter project name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={({field})=>(
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
                                                <p className="flex flex-col">Project Icon</p>
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
                                                        onClick={()=>{
                                                            field.onChange(null);
                                                            if(inputRef.current){
                                                                inputRef.current.value = ''
                                                            }
                                                        }}
                                                    >
                                                        Remove Image
                                                    </Button>
                                                ): (
                                                    <Button
                                                        type="button"
                                                        disabled={isPending}
                                                        variant="teritrary"
                                                        size="xs"
                                                        className="w-fit mt-2"
                                                        onClick={()=>inputRef.current?.click()}
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
                                type="submit"
                            >
                                Create Project
                            </Button>

                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}


