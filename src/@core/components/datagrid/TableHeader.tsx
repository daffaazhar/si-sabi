// ** React Imports
import { Fragment, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icon Imports
import Icon from '@core/components/icon'

interface TableHeaderProps {
  customExportButton?: ReactNode
  exportButton?: {
    show?: boolean
    onClick?: () => void
    text?: string
    icon?: ReactNode
    customProps?: ButtonProps
  }
  actionButton?: {
    show?: boolean
    onClick?: () => void
    text?: string
    icon?: ReactNode
    customProps?: ButtonProps
  }
  toolBarItems?: ReactNode[]
  noPadding?: boolean
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { toolBarItems = [], noPadding = false } = props
  const { customExportButton } = props
  const {
    exportButton = {
      show: false,
      text: 'Export'
    }
  } = props
  const {
    actionButton = {
      show: false,
      text: 'Add New'
    }
  } = props

  return (
    <Box
      sx={{
        py: 4,
        px: noPadding ? 2 : 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {!!customExportButton ? (
        customExportButton
      ) : (
        <Fragment>
          {exportButton.show ? (
            <Button
              color='secondary'
              variant='tonal'
              onClick={exportButton.onClick}
              startIcon={exportButton.icon ?? <Icon icon='tabler:upload' />}
              {...exportButton.customProps}
            >
              {exportButton.text ?? 'Export'}
            </Button>
          ) : (
            <Box />
          )}
        </Fragment>
      )}
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {toolBarItems.map((item, index) => (
          <Fragment key={`@core-components-datagrid-tableheader-toolbaritems-${index}`}>{item}</Fragment>
        ))}
        {/* <CustomTextField sx={{ mr: 4 }} placeholder='Search Area' onChange={handleFilter} /> */}

        {actionButton.show ? (
          <Button
            onClick={actionButton.onClick}
            variant='contained'
            sx={{ '& svg': { mr: 2 } }}
            {...actionButton.customProps}
          >
            {actionButton.icon ?? <Icon fontSize='1.125rem' icon='tabler:plus' />}
            {actionButton.text ?? 'Add New'}
          </Button>
        ) : null}
      </Box>
    </Box>
  )
}

export default TableHeader
