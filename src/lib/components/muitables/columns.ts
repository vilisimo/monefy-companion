import { GridColDef } from '@mui/x-data-grid'

export const baseDefinition = (field: string): GridColDef => ({
  field,
  headerName: field.charAt(0).toUpperCase() + field.slice(1),
  flex: 1,
  align: 'left',
  headerAlign: 'left',
})
