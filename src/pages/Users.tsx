import { useState } from 'react';
import DataTable from '../components/DataTable';
import { useGetUsersQuery } from '../redux/api/userApi';
import { IUser } from '../types/user.types';
import { SearchPrams } from '../types/common.types';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';

const UsersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchPrams>({
    pageSize: 5,
    currentPage: 1,
  });
  const { data, isLoading, isError, isFetching } = useGetUsersQuery({
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
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {isError && <p>Error</p>}
      {!isLoading && !isError && (
        <DataTable
          data={data?.users as IUser[]}
          columns={['name', 'email', 'birthDate', 'gender']}
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

export default UsersPage;
