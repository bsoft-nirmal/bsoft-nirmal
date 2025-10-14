import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';

interface Props<T extends { id: string | number }> {
  rows: T[];
  columns: GridColDef[];
  loading?: boolean;
  pageSize?: number;
}

export default function DataTable<T extends { id: string | number }>({ rows, columns, loading, pageSize = 10 }: Props<T>) {
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        loading={loading}
        disableRowSelectionOnClick
        initialState={{ pagination: { paginationModel: { page: 0, pageSize } } }}
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </div>
  );
}
