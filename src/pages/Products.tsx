import { useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import { useGetProductsQuery } from '../redux/api/productApi';
import { IProductTable } from '../types/product.types';
import { SearchPrams } from '../types/common.types';
import DefaultPageLayout from '../layouts/DefaultPageLayout';
import NotFound from '../components/NotFound';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchPrams>({
    pageSize: 5,
    currentPage: 1,
  });
  const { data, isLoading, isError, isFetching } = useGetProductsQuery({
    limit: searchParams.pageSize,
    skip: (searchParams.currentPage - 1) * searchParams.pageSize,
  });

  const products: IProductTable[] | [] = useMemo(() => {
    if (data && data.products.length !== 0) {
      return data.products.map((product) => ({
        ...product,
        reviewCount: product.reviews.length,
        discountPercentage: `${product.discountPercentage}%`,
      }));
    }
    return [];
  }, [data]);

  const onPageChange = (page: number) => {
    setSearchParams((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onPageSizeChange = (size: number) => {
    setSearchParams({ pageSize: size, currentPage: 1 });
  };

  return (
    <DefaultPageLayout isLoading={isLoading || isFetching} title="Products">
      {isError && <p>Error</p>}
      {products.length !== 0 ? (
        <>
          <DataTable
            data={products}
            headers={[
              'sku',
              'title',
              'brand',
              'category',
              'stock',
              'price',
              'rating',
              'reviewCount',
              'availabilityStatus',
              'warrantyInformation',
              'discountPercentage',
              'warrantyInformation',
            ]}
          />
          <Pagination
            totalCount={data?.total as number}
            currentPage={searchParams.currentPage}
            onPageChange={onPageChange}
            pageSize={searchParams.pageSize}
            onPageSizeChange={onPageSizeChange}
          />
        </>
      ) : (
        <>{!isLoading && <NotFound />}</>
      )}
    </DefaultPageLayout>
  );
};

export default ProductsPage;
