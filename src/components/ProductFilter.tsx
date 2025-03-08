interface ProductFilterProps {
  onSearch: (query: string) => void;
  onPageSizeChange: (size: number) => void;
  onCategoryChange: (value: string) => void;
  pageSize: number;
  filters: string[];
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
      <select
        value={dropDownValue}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 rounded-lg border bg-grey text-black"
      >
        {filters.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilter;
