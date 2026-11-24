"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, MailCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import {
    forgotPasswordSchema,
    ForgotPasswordSchemaType,
} from "@/lib/schemas/auth.schema"
import { ForgotPassword } from "@/services/auth.services"
import { toast } from "sonner"

export default function ForgetPasswordPage() {
    const [emailSent, setEmailSent] = useState(false)
    const [sentEmail, setSentEmail] = useState("")

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = useForm<ForgotPasswordSchemaType>({
        mode: "all",
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    async function handleForgotPassword(values: ForgotPasswordSchemaType) {
        try {
            const response = await ForgotPassword(values)
            setSentEmail(values.email)
            setEmailSent(true)
            toast.success(response.message || "Password reset instructions sent")
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Unable to send password reset instructions",
            )
        }
    }

    if (emailSent) {
        return (
            <main className="flex min-h-[600px] items-center px-4 py-8">
                <div className="mx-auto w-full max-w-md text-center">
                    <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <MailCheck className="size-10" aria-hidden="true" />
                    </div>
                    <h1 className="mt-6 text-2xl font-bold">Check your email</h1>
                    <p className="mt-3 text-muted-foreground">
                        We sent password reset instructions to{" "}
                        <span className="font-semibold text-foreground">{sentEmail}</span>.
                    </p>
                    <Button asChild className="mt-8 w-full">
                        <Link href="/login">
                            <ArrowLeft className="size-4" />
                            Back to Login
                        </Link>
                    </Button>
                </div>
            </main>
        )
    }

    return (
        <main className="flex min-h-[600px] items-center px-4 py-8">
            <div className="mx-auto w-full max-w-md">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Forgot Password</h1>
                    <p className="mt-2 text-muted-foreground">
                        Enter your email address and we&apos;ll send you instructions to reset your password.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(handleForgotPassword)}
                    className="space-y-5"
                >
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
                                    placeholder="Enter your email"
                                    type="email"
                                    className="h-11 rounded-xl bg-white border-gray-300"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Button
                        type="submit"
                        className="h-11 w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Spinner />
                                Sending...
                            </>
                        ) : (
                            "Send Reset Instructions"
                        )}
                    </Button>

                    <Button asChild variant="ghost" className="w-full text-muted-foreground">
                        <Link href="/login">
                            <ArrowLeft className="size-4" />
                            Back to Login
                        </Link>
                    </Button>
                </form>
            </div>
        </main>
    )
}
