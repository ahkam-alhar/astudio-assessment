import { ReactNode } from 'react';

interface FilterProps {
  onSearch: (query: string) => void;
  onPageSizeChange: (size: number) => void;
  pageSize: number;
  children: ReactNode;
}

const Filter: React.FC<FilterProps> = ({
  onSearch,
  pageSize,
  onPageSizeChange,
  children,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="px-4 py-2 rounded-lg border bg-grey text-black"
      >
        {[5, 10, 20, 50].map((size) => (
          <option key={size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        className="px-4 py-2 border rounded-lg text-black"
      />
      {children}
    </div>
  );
};

export default Filter;
