export default async function getProducts(limit?: string, sort?: string, page:number =1, brand?:string, categoryId?:string){
  const baseUrl = "https://ecommerce.routemisr.com/api/v1/products";
  const params = new URLSearchParams();

  if (limit) params.append("limit", limit);
  if (sort) params.append("sort", sort);
  if (page) params.append("page", String(page));
  if (brand) params.append("brand", brand);
  if (categoryId) params.append("category[in]", categoryId);

  const url = `${baseUrl}${params.toString() ? `?${params}` : ""}`;

  const response = await fetch(url, { cache: "no-cache" });
  const { data, metadata } = await response.json();

  return {data, metadata};
}