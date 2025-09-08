
export default async function verifyResetCode(resetCode: string) {
    try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({resetCode}),
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