import Button from "../Button";

type TableProps<T> = {
  data: T[];
  columns: Array<{ header: string; accessor: keyof T }>;
  page: number;
  maxLength: number;
  setPage: (page: number) => void;
  rowClick?: (index: number) => void;
};

const Table = <T extends { id: number | string }>({
  data,
  columns,
  page,
  rowClick,
  maxLength,
  setPage
}: TableProps<T>) => {
  return (
    <div>
      {data.length === 0 ? (
        <div className="flex justify-center w-full mt-8">
          <h1 className="text-2xl font-bold text-white">No data available</h1>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-8 text-xl">
          <table className="text-gray-200 bg-secondary/50">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <td key={index} className="px-4 py-2">
                    {column.header.toUpperCase()}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={row.id + rowIndex.toString()}
                  onClick={() => rowClick && rowClick(rowIndex)}
                  aria-disabled={!rowClick}
                  className="bg-secondary/50 even:bg-secondary/25 hover:bg-buttonBackground-confirm hover:cursor-pointer"
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="p-2">
                      {String(row[column.accessor])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center w-full gap-2 mt-8">
            <Button
              // className="px-4 py-2 font-bold bg-white rounded disabled:bg-white/50"
              disabled={page === 1}
              text="Previous"
              onClick={() => setPage(page - 1)}
            />
            <Button
              // className="px-4 py-2 font-bold bg-white rounded disabled:bg-white/50"
              disabled={page === 1}
              text={`Page: ${page}`}
              onClick={() => setPage(page - 1)}
            />
            <Button
              // className="px-4 py-2 font-bold bg-white rounded disabled:bg-white/50"
              disabled={data.length < maxLength}
              text="Next"
              onClick={() => setPage(page + 1)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
