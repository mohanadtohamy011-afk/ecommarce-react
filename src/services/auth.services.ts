import { ForgotPasswordSchemaType, LoginSchemaType, RegisterSchemaType } from "@/lib/schemas/auth.schema";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

console.log(baseURL);


export async function SignupUser(formData: RegisterSchemaType) {

    const response = await fetch(`${baseURL}/api/v1/auth/signup`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json" ,
        }
    }
    );

    const data = await response.json();
    return data;
}


export async function SigninUser(formData: LoginSchemaType) {

    const response = await fetch(`${baseURL}/api/v1/auth/signin`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json" ,
        }
    }
    );

    const data = await response.json();
    return data;
}

export async function ForgotPassword(formData: ForgotPasswordSchemaType) {
    const response = await fetch(`${baseURL}/api/v1/auth/forgotPasswords`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Unable to send reset instructions");
    }
    return data;
}