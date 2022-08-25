import React, { JSXElementConstructor, ReactElement } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Header from "../components/Header";
import Card from "../components/Card";
import { trpc } from "../utils/trpc";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardContainer from "../components/CardContainer";
import { Product } from "@prisma/client";

function Home() {
  const { status } = useSession();
  const allProducts = trpc.useQuery(['product.get-products'])

  type ProductWithShop = Product & {
    shop:{
      name: string
    }
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

        <div className="w-full h-screen relative">
          {status === "loading" ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <Header/>
              <div className='mx-[80px] my-auto'>
                <Banner/>
                {allProducts.isLoading ? <h1>Loading...</h1> : 
                <div className="my-[20px]">
                  <h1 className="text-xl font-bold">
                    New Releases
                  </h1>
                  <CardContainer>
                    {allProducts?.data?.map((product: ProductWithShop)=>(
                      <Card 
                      productName={product.name} 
                      shopName={product.shop.name} 
                      href={`/products/${product.id}`} 
                      key={product.id} 
                      />
                    ))}
                  </CardContainer>
                </div>
                }

              </div>
            </>
          )}
        </div>
    </>
  );
}

export default Home;


export function Banner() {
  const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true
};
  return (
    <Slider {...settings} className='h-[220px] bg-white rounded shadow-md p-3 my-[20px]'>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  )
}