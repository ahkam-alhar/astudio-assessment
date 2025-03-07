import { useGetUsersQuery } from '../redux/api/userApi';

const UsersPage: React.FC = () => {
  const { data, isLoading, isError } = useGetUsersQuery();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {!isLoading && !isError && data?.total}
    </div>
  );
};

export default UsersPage;
