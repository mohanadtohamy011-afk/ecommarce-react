"use client"
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { registerSchema, RegisterSchemaType } from '@/lib/schemas/auth.schema';
import { SignupUser } from '@/services/auth.services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner';

export default function Register() {

  const router = useRouter();

    const {handleSubmit, control, register , formState:{isSubmitting}} = useForm<RegisterSchemaType>({
        mode:"all",
        resolver: zodResolver(registerSchema),
        defaultValues: {
            "name": "",
            "email": "",
            "password": "",
            "rePassword": "",
            "phone": ""
        },
    })

    async function handelUserRegister(values : RegisterSchemaType){
        console.log(values);

        try {
          const response = await SignupUser(values);
          console.log(response);
          if(response.message === "success"){
            toast.success("account created successfully");
            router.push("/login");
          }else{
            toast.error(response.message);
          }
        } catch (error) {
          console.log(error);
          
        }
    }
    return (
        <>
            <div className='px-4 py-8'>
            <form onSubmit={handleSubmit(handelUserRegister)} className='space-y-4'>

                <Controller
  name="name"
  control={control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
      <Input
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your name"
        type="text"
        className="bg-white border-gray-300 rounded-xl"
      />
      
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>

<Controller
  name="email"
  control={control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
      <Input
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your Email"
        type="email"
        className="bg-white border-gray-300 rounded-xl"
      />
      
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
<Controller
  name="password"
  control={control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
      <Input
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your Password"
        type="password"
        className="bg-white border-gray-300 rounded-xl"
      />
      
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
<Controller
  name="rePassword"
  control={control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Confirm  Passowrd</FieldLabel>
      <Input
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Confirm your Password"
        type="password"
        className="bg-white border-gray-300 rounded-xl"
      />
      
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
<Controller
  name="phone"
  control={control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
      <Input
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your Phone"
        type="tel"
        className="bg-white border-gray-300 rounded-xl"
      />
      
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>

<Button className='w-full' type='submit' variant="default">
  {isSubmitting ? <Spinner/> : "Register"}
</Button>
            </form>
            </div>
        </>
    )
}
