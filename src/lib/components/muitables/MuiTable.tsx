import { MonefyCurrencyContext } from '@/app/monefyContext'
import { localizeAmount } from '@/lib/tools/formatting'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid'
import Big from 'big.js'
import * as React from 'react'

interface CellProps {
  amount: Big
  currency: string
  locale: string
}

const Cell = ({ amount, currency, locale }: CellProps) => {
  return <span>{localizeAmount(amount, currency, locale)}</span>
}

export interface Props {
  rows: {
    id: string
    category: string
    amount: Big
  }[]
}

const baseDefinition = (field: string): GridColDef => ({
  field,
  headerClassName: 'mui-table--header',
  headerAlign: 'left',
  align: 'left',
  flex: 1,
  renderHeader: () => <span className="font-bold capitalize">{field}</span>,
})

export default function MuiDataTable({ rows }: Props) {
  const { currency, locale } = React.useContext(MonefyCurrencyContext)
  const categoryColumnDefinition = baseDefinition('category')
  const amountColumnDefinition = {
    ...baseDefinition('amount'),
    valueFormatter: (params: GridValueFormatterParams<Big>) => `${localizeAmount(params.value, currency, locale)}`,
    renderCell: (params: GridRenderCellParams<Big>) => (
      <Cell amount={params.value} currency={currency} locale={locale} />
    ),
  }

  return (
    <div className="w-[80%] lg:w-[40%]">
      <DataGrid
        autoHeight
        rows={rows}
        columns={[categoryColumnDefinition, amountColumnDefinition]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
        sx={{
          '& .mui-table--header': {
            backgroundColor: 'rgba(255, 7, 0, 0.55)',
            fontWeight: 'bold',
          },
        }}
      />
    </div>
  )
}
