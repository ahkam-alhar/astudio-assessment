import { FilterDropdownProps } from '../types/common.types';
import Filter from './core/Filter';

interface ProductFilterProps {
  onSearch: (query: string) => void;
  onPageSizeChange: (size: number) => void;
  onCategoryChange: (value: string) => void;
  pageSize: number;
  filters: FilterDropdownProps[];
  dropDownValue: string;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  onSearch,
  filters,
  onPageSizeChange,
  onCategoryChange,
  pageSize,
  dropDownValue,
}) => {
  return (
    <Filter
      onPageSizeChange={onPageSizeChange}
      onSearch={onSearch}
      pageSize={pageSize}
    >
      <select
        value={dropDownValue}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 rounded-lg border bg-grey text-black"
      >
        {filters.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </Filter>
  );
};

export default ProductFilter;
