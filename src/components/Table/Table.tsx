import { useEffect, useRef } from "react";
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
  const theadRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    theadRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [page]);

  return (
    <div className="w-full h-full p-2">
      {data.length === 0 ? (
        <div className="flex justify-center w-full mt-8">
          <h1 className="text-2xl font-bold text-white">No data available</h1>
        </div>
      ) : (
        <div className="flex flex-col items-center h-full mt-8 text-xl">
          <div className="flex items-start justify-center w-full max-h-[80%] overflow-auto">
            <table className="text-gray-200 bg-secondary/50">
              <thead ref={theadRef}>
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
                    className={`bg-secondary/90 even:bg-secondary/25 hover:bg-buttonBackground-confirm ${rowClick ? "hover:cursor-pointer select-none" : ""}`}
                  >
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className="p-1 md:p-2">
                        {String(row[column.accessor])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-start w-full sm:items-center sm:flex-row sm:justify-center gap-2 py-2 max-h-[25%] md:max-h-[20%]">
            <Button
              type="confirm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <Button>
              {`Page: ${page}`}
            </Button>
            <Button
              type="confirm"
              disabled={data.length < maxLength}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
