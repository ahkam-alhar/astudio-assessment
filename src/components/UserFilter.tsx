import { FilterButtonProps } from '../types/common.types';
import Filter from './core/Filter';

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
    <Filter
      onPageSizeChange={onPageSizeChange}
      onSearch={onSearch}
      pageSize={pageSize}
    >
      <div className="flex flex-wrap justify-center gap-4">
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
    </Filter>
  );
};

export default UserFilter;
