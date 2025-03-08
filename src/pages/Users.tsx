import { useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import { useGetUsersQuery } from '../redux/api/userApi';
import { IUserTable } from '../types/user.types';
import { SearchPrams } from '../types/common.types';
import Pagination from '../components/Pagination';
import DefaultPageLayout from '../layouts/DefaultPageLayout';
import NotFound from '../components/NotFound';

const UsersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchPrams>({
    pageSize: 5,
    currentPage: 1,
  });
  const { data, isLoading, isError, isFetching } = useGetUsersQuery({
    limit: searchParams.pageSize,
    skip: (searchParams.currentPage - 1) * searchParams.pageSize,
  });

  const users: IUserTable[] | [] = useMemo(() => {
    if (data && data.users.length !== 0) {
      return data.users.map((user) => ({
        ...user,
        country: user.address.country,
        gender: user.gender === 'male' ? 'M' : 'F',
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
    <DefaultPageLayout title="Users" isLoading={isLoading || isFetching}>
      {isError && <p>Error</p>}
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

export default UsersPage;
