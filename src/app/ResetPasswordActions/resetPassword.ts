
export default async function resetPassword({email, newPassword}: {email: string, newPassword: string}) {
    try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, newPassword}),
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