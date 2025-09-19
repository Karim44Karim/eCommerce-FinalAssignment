export default async function getAllCategories() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    if (!response.ok)
      throw new Error(response.statusText || "Failed to fetch categories");
    const { data, metadata } = await response.json();
    return {data, metadata};
  } catch (error) {
    console.log(error);
    return { error: error as string };
  }
}
