import { useGetProductsQuery } from '../redux/api/productApi';

const ProductsPage: React.FC = () => {
  const { data, isLoading, isError } = useGetProductsQuery();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {!isLoading && !isError && data?.total}
    </div>
  );
};

export default ProductsPage;
