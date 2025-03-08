import { useState } from 'react';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import { useGetProductsQuery } from '../redux/api/productApi';
import { IProduct } from '../types/product.types';
import LoadingSpinner from '../components/LoadingSpinner';
import { SearchPrams } from '../types/common.types';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchPrams>({
    pageSize: 5,
    currentPage: 1,
  });
  const { data, isLoading, isError, isFetching } = useGetProductsQuery({
    limit: searchParams.pageSize,
    skip: (searchParams.currentPage - 1) * searchParams.pageSize,
  });

  const onPageChange = (page: number) => {
    setSearchParams((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
  };

  const onPageSizeChange = (size: number) => {
    setSearchParams({ pageSize: size, currentPage: 1 });
  };

  return (
    <div className="container">
      {(isLoading || isFetching) && <LoadingSpinner />}
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {isError && <p>Error</p>}
      {!isLoading && !isError && (
        <DataTable
          data={data?.products as IProduct[]}
          columns={['title', 'brand', 'category', 'stock']}
        />
      )}
      <Pagination
        totalCount={data?.total as number}
        currentPage={searchParams.currentPage}
        onPageChange={onPageChange}
        pageSize={searchParams.pageSize}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export default ProductsPage;
