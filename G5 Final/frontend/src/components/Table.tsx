import { useState } from 'react';
import type { JSX } from 'react';

type Column<T> = {
  header: string;
  accessor: keyof T | string; 
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  filterField?: keyof T;
  rowsPerPage?: number;
  renderRow?: (item: T) => JSX.Element;
};

export default function Table<T>({
  data,
  columns,
  filterField,
  rowsPerPage = 5,
  renderRow,
}: TableProps<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filteredData = data.filter((item) => {
    if (!filterField) return true;
    const fieldValue = String(item[filterField]).toLowerCase();
    return fieldValue.includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '200px' }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderRow
            ? paginatedData.map(renderRow)
            : paginatedData.map((item, idx) => (
                <tr key={idx}>
                  {columns.map((col) => (
                    <td
                      key={String(col.accessor)}
                      style={{
                        borderBottom: '1px solid #eee',
                        padding: '0.5rem',
                        textAlign: 'center',
                      }}
                    >
                      {String((item as any)[col.accessor])}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        Página {page} de {totalPages}
        <div style={{ marginTop: '0.5rem' }}>
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            style={{ marginRight: '1rem' }}
          >
            Anterior
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
