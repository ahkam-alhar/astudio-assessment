import { useState } from 'react';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import { useGetProductsQuery } from '../redux/api/productApi';
import { IProduct } from '../types/product.types';
import { SearchPrams } from '../types/common.types';
import DefaultPageLayout from '../layouts/DefaultPageLayout';

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
    <DefaultPageLayout isLoading={isLoading || isFetching} title="Products">
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
    </DefaultPageLayout>
  );
};

export default ProductsPage;
