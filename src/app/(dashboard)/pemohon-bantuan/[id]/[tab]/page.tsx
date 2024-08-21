'use client'

// React & Next Imports
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

// Material Imports
import { Tab, ButtonProps, styled, Box } from '@mui/material'
import { TabContext, TabPanel } from '@mui/lab'
import MuiTabList from '@mui/lab/TabList'

// Custom Component Imports
import Icon from '@/@core/components/icon'
import SurveyPage from '@/views/pemohon-bantuan/SurveyPage'
import PrinsipPage from '@/views/pemohon-bantuan/PrinsipPage'
import SpesifikasiPage from '@/views/pemohon-bantuan/SpesifikasiPage'
import PencairanPage from '@/views/pemohon-bantuan/PencairanPage'
import PertanggungjawabanPage from '@/views/pemohon-bantuan/PertanggungjawabanPage'

type CustomCardWithHorizontalTabsStepType = {
  title: string
  tabTo?: string
  page?: ReactNode
  actionButtons?: {
    menuButtonComponent?: ReactNode
    leftButtonProps?: ButtonProps
    leftButtonComponent?: ReactNode
    rightButtonProps?: ButtonProps
    rightButtonComponent?: ReactNode
  }
}

export default function Page({ params }: { params: { id: string; tab: string } }) {
  const { id, tab } = params
  const router = useRouter()

  const TabList = styled(MuiTabList)<any>(({ color, theme, pill, orientation }) => ({
    ...(pill === 'true' && {
      minHeight: 38,
      ...(orientation === 'vertical'
        ? {
            borderInlineEnd: 0
          }
        : {
            borderBlockEnd: 0
          }),
      '&, & .MuiTabs-scroller': {
        ...(orientation === 'vertical' && {
          boxSizing: 'content-box'
        }),
        margin: `${theme.spacing(-1, -1, -1.5, -1)} !important`,
        padding: theme.spacing(1, 1, 1.5, 1)
      },
      '& .MuiTabs-indicator': {
        display: 'none'
      },
      '& .MuiTabs-flexContainer': {
        gap: theme.spacing(1)
      },
      '& .Mui-selected': {
        backgroundColor: `var(--mui-palette-${color}-main) !important`,
        color: `var(--mui-palette-${color}-contrastText) !important`,
        boxShadow: `var(--mui-customShadows-${color}-sm)`
      },
      '& .MuiTab-root': {
        minHeight: 38,
        padding: theme.spacing(2, 5),
        borderRadius: 'var(--mui-shape-borderRadius)',
        marginTop: '0 !important',
        marginBottom: '0 !important',
        '&:hover': {
          border: 0,
          backgroundColor: `var(--mui-palette-${color}-lightOpacity)`,
          color: `var(--mui-palette-${color}-main)`,
          ...(orientation === 'vertical'
            ? {
                paddingInlineEnd: theme.spacing(5)
              }
            : {
                paddingBlockEnd: theme.spacing(2)
              })
        }
      }
    })
  }))

  const tabs: CustomCardWithHorizontalTabsStepType[] = [
    {
      title: 'Survey',
      tabTo: 'survey',
      page: <SurveyPage id={id} />
    },
    {
      title: 'Prinsip',
      tabTo: 'prinsip',
      page: <PrinsipPage id={id} />
    },
    {
      title: 'Spesifikasi',
      tabTo: 'spesifikasi',
      page: <SpesifikasiPage id={id} />
    },
    {
      title: 'Pencairan',
      tabTo: 'pencairan',
      page: <PencairanPage id={id} />
    },
    {
      title: 'Pertanggungjawaban',
      tabTo: 'pertanggungjawaban',
      page: <PertanggungjawabanPage id={id} />
    }
  ]

  const activeStep = tabs.findIndex(step => step.tabTo === tab)

  const handleChangeTab = (newValue: number) => {
    router.replace(`/pemohon-bantuan/${id}/${tabs[newValue].tabTo}`)
  }

  return (
    <TabContext value={activeStep.toString()}>
      <TabList
        color='primary'
        pill='true'
        variant='scrollable'
        scrollButtons='auto'
        allowScrollButtonsMobile
        onChange={(_: any, newValue: number) => handleChangeTab(newValue)}
      >
        {tabs.map((item, index) => (
          <Tab
            value={index.toString()}
            key={index}
            label={<Box sx={{ display: 'flex', alignItems: 'center' }}>{item.title}</Box>}
            sx={{ my: 6 }}
          />
        ))}
      </TabList>

      {tabs.map((item, index) => (
        <TabPanel key={index} value={index.toString()} sx={{ p: 0, marginTop: '0 !important' }}>
          {item.page}
        </TabPanel>
      ))}
    </TabContext>
  )
}
