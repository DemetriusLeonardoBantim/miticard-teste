import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { registerRestaurant } from '@/api/register-restaurant'

const SignUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email(),
})

type SignUpForm = z.infer<typeof SignUpForm>

export function SignUp() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>()
    const navigate = useNavigate()

    const { mutateAsync: registerRestaurantFn } = useMutation({
        mutationFn: registerRestaurant
    })

    async function handleSignUp(data: SignUpForm) {
        try {
            await registerRestaurantFn({
                restaurantName: data.restaurantName,
                email: data.email,
                managerName: data.managerName,
                phone: data.phone
            })
        } catch {
            toast.error('Erro ao cadastrar restaurante.')
        }

        toast.success(`teste ${data.email}, ${data.managerName}, ${data.phone}`, {
            action: {
                label: 'Login',
                onClick: () => navigate(`/sign-in?email=${data.email}`)
            }
        })
        console.log(data)
    }

    return (
        <>
            <Helmet title='Cadastro' />
            <div className="p-8">
                <Button asChild className='absolute right-4 top-8'>
                    <Link to="/sign-in" className=''>
                        Fazer login
                    </Link>
                </Button>
                <div className='w-[350px] flex-col justify-center gap-6'>
                    <div className='flex flex-col gap-2 text-center'>
                        <h1 className='text-2xl font-semibold tracking-tight'>
                            Criar conta grátis
                        </h1>

                        <p className='text-sm text-muted-foreground'>
                            Seja um parceiro e comece suas vendas!
                        </p>
                    </div>

                    <form action='' className='space-y-4' onSubmit={handleSubmit(handleSignUp)}>
                        <div className='space-y-2'>
                            <Label htmlFor="restauranteName">Nome do restaurange</Label>
                            <Input id="restauranteName" type="text" {...register('restaurantName')} />
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor="managerName">Seu nome</Label>
                            <Input id="managerName" type="text" {...register('managerName')} />
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor="phone">Seu e-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor="email">Seu celular</Label>
                            <Input id="phone" type="text" {...register('phone')} />
                        </div>

                        <Button type="submit" className='w-full' disabled={isSubmitting} >
                            Finalizar cadastro
                        </Button>

                        <p className='px-6 text-center text-sm leading-relaxed text-muted-foreground'>
                            Ao continuar, você concorda com nossos Termos de serviço e nossas políticas de privacidade
                        </p>
                    </form>
                </div>
            </div>
        </>

    )
}