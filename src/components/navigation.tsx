"use client"
import { cn } from "@/lib/utils";
import { SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { IoHomeSharp, IoHomeOutline, IoCheckmarkCircleSharp , IoCheckmarkCircleOutline  } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

const routes = [
    {
        label: "Home",
        href: "/",
        icon: IoHomeOutline,
        activeIcon: IoHomeSharp 
    },
    {
        label: "My Tasks",
        href: "/tasks",
        icon: IoCheckmarkCircleOutline,
        activeIcon: IoCheckmarkCircleSharp 
    },
    {
        label: "Settings",
        href: "/settings",
        icon: SettingsIcon,
        activeIcon: SettingsIcon 
    },
    {
        label: "Members",
        href: "/members",
        icon: UserIcon,
        activeIcon: UserIcon 
    },
]

export const Navigation = ()=>{
    const workspaceId = useWorkspaceId();
    const pathname = usePathname();
    return (
        <ul className="flex flex-col">
            {routes.map((item)=>{
                const fullHref = `/workspaces${item.href}/${workspaceId}`
                const isActive = pathname === fullHref;
                const Icon = isActive ? item.activeIcon : item.icon;
                return(
                    <Link key={item.href} href={fullHref}>
                        <div className={cn(
                            "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                            isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                        )}>
                            <Icon className="size-5 text-neutral-500" />
                            {item.label}
                        </div>
                    </Link>
                )
            })}
        </ul>
    )
}