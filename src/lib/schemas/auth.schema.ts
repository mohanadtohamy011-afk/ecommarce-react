import * as z from 'zod';

export const registerSchema = z
    .object({
        name: z.string().nonempty("Name is Required").min(3, "min chars is 3").max(10, "max chars is 10"),

        email: z.string().nonempty("Email is Required").email("email is not valid"),

        password: z.string().nonempty("Password is Required").min(6, "Password must be at least 6 characters"),

        rePassword: z.string().nonempty("Password is Required"),

        phone: z.string().nonempty("Phone is Required").regex(/^[0-9]{11}$/, "Phone must be 11 digits"),
    })
    .refine(
        (data) => {
            return data.password === data.rePassword;
        },
        { path: ["rePassword"], message: "Password don't match" }
    );

export const loginSchema = z.object({
    email: z.string().nonempty("Email is Required").email("email is not Valid"),

    password: z
        .string()
        .nonempty("password is Required")
        .min(3, "min chars is 3")
        .max(10, "max chars is 10"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().nonempty("Email is required").email("Email is not valid"),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;