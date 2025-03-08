import React from 'react';

interface DataTableProps {
  data: any[];
  columns: string[];
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} className="p-2 border border-grey">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column} className="p-2 border border-grey">
                {row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
