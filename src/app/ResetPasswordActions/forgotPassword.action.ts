import { forgotPasswordSchemaType } from "../schema/forgotPassword.schema";

export default async function forgotPassword(email: forgotPasswordSchemaType) {
    try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(email),
          }
        );
        
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const payload = await res.json();
    console.log(payload);
    
    return payload;

    } catch (error) {
        console.log(error);
    }
    
}