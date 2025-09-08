
export default async function singleProduct(id){

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);

    const { data } = await response.json();

    return data;
}