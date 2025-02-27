import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { StoreProfileDialog } from "./store-profile-dialog";
import { signOut } from "@/api/sign-out";
import { useNavigate } from "react-router-dom";

export function AccountMenu() {
    const navigate = useNavigate()

    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: Infinity,
    })

    const { data: managedRestaurant, isLoading: isLoadingMannagedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity,
    })

    const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            navigate('/sign-in', { replace: true })
        }
    })

    console.log(profile)
    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 select-none">
                        <span>{isLoadingMannagedRestaurant ? (<Skeleton className="h-4 w-40" />) : 'Demetrius Gerente'}</span>
                        <ChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex flex-col">
                        <span className="text-xs font-normal text-muted-foreground">{isLoadingProfile ? (<Skeleton className="h-32 w-24" />) : profile?.email}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DialogTrigger asChild>
                        <DropdownMenuItem>
                            <Building className="w-4 h-4 mr-4" />
                            <span>Perfil da loja</span>
                        </DropdownMenuItem>
                    </DialogTrigger>

                    <DropdownMenuItem className="text-rose-500 dark:text-rose-400" asChild disabled={isSigningOut}>
                        <button onClick={() => signOutFn()} className="w-full">
                            <LogOut className="w-4 h-4 mr-4" />
                            <span>Sair</span>
                        </button>

                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <StoreProfileDialog />

        </Dialog>

    )
}