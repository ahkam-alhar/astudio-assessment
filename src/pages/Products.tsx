import { useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import {
  useGetGategoriesQuery,
  useGetProductsQuery,
} from '../redux/api/productApi';
import { IProductTable } from '../types/product.types';
import { FilterDropdownProps, SearchPrams } from '../types/common.types';
import DefaultPageLayout from '../layouts/DefaultPageLayout';
import NotFound from '../components/NotFound';
import { filterData } from '../utils/filterData';
import ProductFilter from '../components/ProductFilter';
import { useDebounce } from '../hooks/useDebounce';
import ErrorPage from '../components/ErrorPage';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchPrams>({
    pageSize: 5,
    currentPage: 1,
    searchText: '',
    filterKey: '',
  });
  const debouncedSearch = useDebounce(searchParams.searchText, 300);

  const { data, isLoading, isError, isFetching } = useGetProductsQuery(
    {
      limit: searchParams.pageSize,
      skip: (searchParams.currentPage - 1) * searchParams.pageSize,
      select:
        'sku,title,brand,category,stock,price,rating,reviews,availabilityStatus,warrantyInformation,discountPercentage,minimumOrderQuantity',
      category: searchParams.filterKey,
    },
    { skip: debouncedSearch !== '' && searchParams.filterKey === '' }
  );

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetGategoriesQuery();

  const products: IProductTable[] | [] = useMemo(() => {
    if (data && data.products.length !== 0 && debouncedSearch !== '') {
      const modifiedData = data.products.map((product) => ({
        ...product,
        reviewCount: product.reviews.length,
        discountPercentage: `${product.discountPercentage}%`,
      }));
      return filterData(modifiedData, debouncedSearch);
    } else if (data && data.products.length !== 0) {
      return data.products.map((product) => ({
        ...product,
        reviewCount: product.reviews.length,
        discountPercentage: `${product.discountPercentage}%`,
      }));
    }

    return [];
  }, [data, debouncedSearch]);

  const categories: FilterDropdownProps[] | [] = useMemo(() => {
    if (categoriesData) {
      const data = categoriesData.map((val) => ({
        label: val.name,
        value: val.slug,
      }));

      return [{ label: 'All categories', value: 'All' }, ...data];
    }
    return [];
  }, [categoriesData]);

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
    setSearchParams((prevState) => ({
      ...prevState,
      pageSize: size,
      currentPage: 1,
    }));
  };

  const onSearch = (value: string) => {
    setSearchParams((prevState) => ({ ...prevState, searchText: value }));
  };

  const onCategoryChange = (value: string) => {
    setSearchParams((prevState) => ({ ...prevState, filterKey: value }));
  };

  return (
    <DefaultPageLayout
      isLoading={isLoading || isFetching || categoriesLoading}
      title="Products"
    >
      {isError || categoriesError ? (
        <ErrorPage />
      ) : (
        <>
          {categories && categories.length !== 0 && (
            <ProductFilter
              filters={categories}
              dropDownValue={searchParams.filterKey}
              onSearch={onSearch}
              onPageSizeChange={onPageSizeChange}
              pageSize={searchParams.pageSize}
              onCategoryChange={onCategoryChange}
            />
          )}
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
                  'minimumOrderQuantity',
                ]}
              />
              {debouncedSearch === '' && (
                <Pagination
                  totalCount={data?.total as number}
                  currentPage={searchParams.currentPage}
                  onPageChange={onPageChange}
                  pageSize={searchParams.pageSize}
                />
              )}
            </>
          ) : (
            <>{!isLoading && <NotFound />}</>
          )}
        </>
      )}
    </DefaultPageLayout>
  );
};

export default ProductsPage;
