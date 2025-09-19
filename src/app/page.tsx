import Image from "next/image";
import MainSlider from "./_components/MainSlider/MainSlider";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
import AllProducts from "./_components/AllProducts/AllProducts";
import CategroriesMenu from "./_components/CategoriesMenu/CategroriesMenu";
import Offer from "./_components/Offer/Offer";
import NewArrival from "./_components/NewArrival/NewArrival";

export default function Home() {
  return (
    <>
      <div className="w-[80%] mx-auto flex mb-20 mt-4 gap-6 flex-wrap md:flex-nowrap">
        <CategroriesMenu />
        <MainSlider />
      </div>
      <AllProducts
        number={"16"}
        sectionTitle={"Today's"}
        subTitle={"Flash Sales"}
        sort={"-updatedAt"}
        variant={"slider"}
        rows={1}
      />
      <CategorySlider />
      <AllProducts
        number={"4"}
        sectionTitle={"This Month"}
        subTitle={"Best Selling Products"}
        sort={"-sold"}
        variant={"slider"}
        rows={2}
      />
      <Offer/>
      <AllProducts
        number={"16"}
        sectionTitle={"Our Products"}
        subTitle={"Explore Our Products"}
        sort={""}
        variant={"slider"}
        rows={2}
      />
      <NewArrival/>
    </>
  );
}
