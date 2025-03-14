import ProductItem from "./productItem";

type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
};

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <>
      <div className="mt-6 mb-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <ProductItem {...product} />
          </div>
        ))}
      </div>
    </>
  );
}
