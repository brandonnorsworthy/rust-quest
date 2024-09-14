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
          <table className="text-black bg-white">
            <thead className="font-bold">
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
                  className="bg-slate-100 even:bg-slate-200 hover:bg-white hover:cursor-pointer"
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-2 py-1">
                      {String(row[column.accessor])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center w-full gap-2 mt-8">
            <button
              className="px-4 py-2 font-bold bg-white rounded disabled:bg-white/50"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span className="px-4 py-2 font-bold bg-white rounded select-none">
              Page: {page}
            </span>
            <button
              className="px-4 py-2 font-bold bg-white rounded disabled:bg-white/50"
              disabled={data.length < maxLength}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
