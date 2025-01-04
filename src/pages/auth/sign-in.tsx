import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/api/sign-in'

const signInForm = z.object({
    email: z.string().email(),
})

type signInForm = z.infer<typeof signInForm>

export function SignIn() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<signInForm>({
        defaultValues: {
            email: searchParams.get('email') ?? ''
        }
    })

    async function handleSignIn(data: signInForm) {
        try {
            navigate('/', { replace: true })
           // await authenticate({ email: data.email })
            toast.success('Login efetuado com sucesso.')
        } catch {
            toast.error('Credenciais inválidas.')
        }
    }

    return (
        <>
            <Helmet title='Login' />
            <div className="p-8">
                <div className='w-[350px] flex-col justify-center gap-6'>
                    <div className='flex flex-col gap-2 text-center'>
                        <h1 className='text-2xl font-semibold tracking-tight'>
                            Acessar painel
                        </h1>
                    </div>

                    <form action='' className='space-y-4' onSubmit={handleSubmit(handleSignIn)}>
                        <div className='space-y-2'>
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor="email">Senha</Label>
                            <Input id="email" type="password" {...register('email')} />
                        </div>

                        <Button type="submit" className='w-full' disabled={isSubmitting} >
                            Acessar painel
                        </Button>
                    </form>
                </div>
            </div>
        </>

    )
}