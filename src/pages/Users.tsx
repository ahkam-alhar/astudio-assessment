import { useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import { useGetUsersQuery } from '../redux/api/userApi';
import { IUserTable } from '../types/user.types';
import { FilterButtonProps, SearchPrams } from '../types/common.types';
import Pagination from '../components/Pagination';
import DefaultPageLayout from '../layouts/DefaultPageLayout';
import NotFound from '../components/NotFound';
import { filterData } from '../utils/filterData';
import UserFilter from '../components/UserFilter';

const userFilters: FilterButtonProps[] = [
  {
    value: 'firstName',
    label: 'First Name',
    isSelected: false,
  },
  {
    value: 'lastName',
    label: 'Last Name',
    isSelected: false,
  },
  {
    value: 'email',
    label: 'Email',
    isSelected: false,
  },
  {
    value: 'username',
    label: 'Username',
    isSelected: false,
  },
  {
    value: 'gender',
    label: 'Gender',
    isSelected: false,
  },
];

const UsersPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterButtonProps[]>(userFilters);
  const [searchParams, setSearchParams] = useState<SearchPrams>({
    pageSize: 5,
    currentPage: 1,
    searchText: '',
    filterKey: '',
  });
  const { data, isLoading, isError, isFetching } = useGetUsersQuery(
    {
      limit: searchParams.pageSize,
      skip: (searchParams.currentPage - 1) * searchParams.pageSize,
      select:
        'firstName,lastName,maidenName,age,gender,email,username,bloodGroup,eyeColor,phone,address,university',
      key: searchParams.filterKey,
      value: searchParams.searchText,
    },
    { skip: searchParams.searchText !== '' && searchParams.filterKey === '' }
  );

  const users: IUserTable[] | [] = useMemo(() => {
    if (
      data &&
      data.users.length !== 0 &&
      searchParams.searchText !== '' &&
      searchParams.filterKey === ''
    ) {
      const modifiedData = data.users.map((user) => ({
        ...user,
        country: user.address.country,
      }));
      return filterData(modifiedData, searchParams.searchText);
    } else if (data && data.users.length !== 0) {
      return data.users.map((user) => ({
        ...user,
        country: user.address.country,
      }));
    }

    return [];
  }, [data, searchParams.searchText, searchParams.filterKey]);

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

  const onFilterSelect = (value: string) => {
    const currentState = [...filters];
    const newState = currentState.map((filter) => ({
      ...filter,
      isSelected: value === filter.value ? !filter.isSelected : false,
    }));

    setFilters(newState);
    setSearchParams((prevState) => ({
      ...prevState,
      filterKey: prevState.filterKey === value ? '' : value,
    }));
  };

  return (
    <DefaultPageLayout title="Users" isLoading={isLoading || isFetching}>
      {isError && <p>Error</p>}
      <UserFilter
        filters={filters}
        onSearch={onSearch}
        onFilterSelect={onFilterSelect}
        onPageSizeChange={onPageSizeChange}
        pageSize={searchParams.pageSize}
      />
      {users.length !== 0 ? (
        <>
          <DataTable
            data={users}
            headers={[
              'firstName',
              'lastName',
              'maidenName',
              'age',
              'gender',
              'email',
              'username',
              'bloodGroup',
              'eyeColor',
              'phone',
              'country',
              'university',
            ]}
          />
          {((searchParams.searchText !== '' && searchParams.filterKey !== '') ||
            searchParams.searchText === '') && (
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
    </DefaultPageLayout>
  );
};

export default UsersPage;
