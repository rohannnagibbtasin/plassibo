import { ResponsiveModal } from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {  JSX, useState } from "react";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

export const useConfirm = (
    title: string,
    message: string,
    variant: ButtonVariant
): [()=> JSX.Element, ()=> Promise<unknown>]=>{
    const [promise, setPromise] = useState<{resolve: (values: boolean)=> void } | null>(null)

    const confirm = ()=>{
        return  new Promise((resolve)=>{
            setPromise({resolve})
        })
    }

    const handleClose = ()=>{
        setPromise(null);
    }

    const handleConfirm = ()=>{
        promise?.resolve(true);
        handleClose();
    }
    const handleCancel = ()=>{
        promise?.resolve(false);
        handleClose();
    }
    const ConfirmationDialog = ()=>(
        <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
            <Card className="w-full h-full border-none shadow-none">
                <CardContent className="pt-8">
                    <CardHeader >
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{message}</CardDescription>
                    </CardHeader>
                    <div className="pt-4 w-full flex flex-col gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
                        <Button onClick={handleCancel} variant='outline' className="w-full lg:w-auto cursor-pointer">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm} variant={variant} className="w-full lg:w-auto cursor-pointer">
                            Confirm
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </ResponsiveModal>
    )

    return [ConfirmationDialog, confirm]

}