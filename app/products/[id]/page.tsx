import { stripe } from "@/lib/stripe";
import { ProductDetail } from "@/components/product-detail";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  const plainProduct = JSON.parse(JSON.stringify(product));
  return <ProductDetail product={plainProduct} />;
}
