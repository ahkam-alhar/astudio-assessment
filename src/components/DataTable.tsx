import React from 'react';
import { formatString } from '../utils/formatString';

interface DataTableProps<T> {
  headers: (keyof T)[];
  data: T[];
}

const DataTable = <T extends Record<string, any>>({
  headers,
  data,
}: DataTableProps<T>) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-grey whitespace-nowrap">
        <thead className="bg-yellow text-white">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left border-b border-grey"
              >
                {formatString(header as string)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-blue text-black">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-grey">
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-2 border-b border-grey whitespace-nowrap"
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
