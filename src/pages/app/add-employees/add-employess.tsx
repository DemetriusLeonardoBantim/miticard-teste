import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const SignUpForm = z.object({
  name: z.string(),
  userType: z.string(),
  phone: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type SignUpForm = z.infer<typeof SignUpForm>;

export const AddEmployees = () => {
  const { register, formState: { isSubmitting }, control } = useForm<SignUpForm>();

  return (
    <>
      <Helmet title="Cadastro de funcionários" />

      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-white mb-8">Cadastro de funcionários</h1>
          <form action="" className="space-y-6">

            <div className="space-y-2">
              <Label htmlFor="restauranteName" className="text-white">Nome do restaurante</Label>
              <Input id="restauranteName" type="text" {...register('name')} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName" className="text-white">Seu nome</Label>
              <Controller
                name="userType"
                control={control}
                render={({ field: { name, onChange, value, disabled } }) => (
                  <Select
                    name={name}
                    onValueChange={onChange}
                    value={value}
                    disabled={disabled}
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Selecione o tipo de usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Parceiros</SelectItem>
                      <SelectItem value="pending">Clientes</SelectItem>
                      <SelectItem value="canceled">Vendedores</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">Seu celular</Label>
              <Input id="phone" type="text" {...register('phone')} className="w-full" />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
              disabled={isSubmitting}
            >
              Finalizar cadastro
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
