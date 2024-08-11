// MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

const TablePaginationComponent = ({
  skip,
  page,
  pageSize,
  setPage,
  total
}: {
  skip: number
  page: number
  pageSize: number
  setPage: any
  total: number
}) => {
  const count = Math.ceil(total / pageSize) // Hitung jumlah halaman

  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography color='text.disabled'>
        {`Showing ${skip + 1} to ${Math.min(skip + pageSize, total)} of ${total} entries`}
      </Typography>
      <Pagination
        shape='rounded'
        color='primary'
        variant='tonal'
        count={count}
        page={page}
        onChange={(_, page) => {
          setPage(page - 1)
        }}
        showFirstButton
        showLastButton
      />
    </div>
  )
}

export default TablePaginationComponent
