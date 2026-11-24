"use client"
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { loginSchema, LoginSchemaType } from '@/lib/schemas/auth.schema';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner';
import Link from 'next/link';


export default function Login() {

    const router = useRouter();

    const { handleSubmit, control, formState: { isSubmitting } } = useForm<LoginSchemaType>({
        mode: "all",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            "email": "",
            "password": "",


        },
    })

    async function handelUserRegister(values: LoginSchemaType) {
        console.log(values);

        

        const response = await signIn("credentials", {
            email: values?.email,
            password: values?.password,
            redirect: false,

        })
        if (response?.ok) {
            toast.success("Login successfully");
            router.push("/products");
        } else {
            toast.error(response?.error);
        }


    }
    return (
        <>
            <div className='px-4 py-8'>
                <form onSubmit={handleSubmit(handelUserRegister)} className='space-y-4'>



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
                    <Button className='w-full' type='submit' variant="default">
                        {isSubmitting ? <Spinner /> : "Login"}
                    </Button>
                    <div className="text-right">
                        <Button asChild variant="link" className="h-auto px-0 text-primary">
                            <Link href="/forget-password">Forgot password?</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}
