export default async function getAllBrands() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    if (!response.ok)
      throw new Error(response.statusText || "Failed to fetch brands");
    const { data, metadata } = await response.json();
    return {data, metadata};
  } catch (error) {
    console.log(error);
    return { error: error as string };
  }
}
