import { IProductTable } from '../types/product.types';
import { IUserTable } from '../types/user.types';

export const filterData = (
  data: (IProductTable | IUserTable)[],
  query: string
): any[] => {
  if (!query) return data;
  const lowercasedQuery = query.toLowerCase();

  return data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(lowercasedQuery)
    )
  );
};
