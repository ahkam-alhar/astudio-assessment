import { FilterButtonProps } from '../types/common.types';

interface UserFilterProps {
  onSearch: (query: string) => void;
  onFilterSelect: (value: string) => void;
  onPageSizeChange: (size: number) => void;
  pageSize: number;
  filters: FilterButtonProps[];
}

const UserFilter: React.FC<UserFilterProps> = ({
  onSearch,
  filters,
  onFilterSelect,
  onPageSizeChange,
  pageSize,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4">
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
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterSelect(filter.value)}
          className={`px-4 py-2 text-white rounded-lg hover:bg-blue ${
            filter.isSelected ? 'bg-blue' : 'bg-yellow'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default UserFilter;
