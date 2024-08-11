// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'

// Third Party Imports
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'

// Component Imports
import LoadingButton from '@mui/lab/LoadingButton'
import DialogCloseButton from '../DialogCloseButton'
import FormattedNumberTextField from '../../mui/FormattedNumberTextField'

// Hook Imports
import { useUpdateApplicant } from '@/hooks/applicant/useUpdateApplicant'
import { Checkbox, FormControlLabel } from '@mui/material'

type FormPencairanProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: any
}

const formSchema = z.object({
  vendor_invoice: z.boolean(),
  vendor_account_appointment_letter: z.boolean(),
  saving_book: z.boolean(),
  bast: z.boolean(),
  statement_letter: z.boolean(),
  usage_report: z.boolean()
})

const FormPencairanDialog = ({ open, setOpen, data }: FormPencairanProps) => {
  const { mutate: update, isPending: isUpdating } = useUpdateApplicant()

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendor_invoice: !!data?.vendor_invoice ?? false,
      vendor_account_appointment_letter: !!data?.vendor_account_appointment_letter ?? false,
      saving_book: !!data?.saving_book ?? false,
      bast: !!data?.bast ?? false,
      statement_letter: !!data?.statement_letter ?? false,
      usage_report: !!data?.usage_report ?? false
    }
  })

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = (body: any) => {
    body.id = data?._id
    const mutationPromise = new Promise((resolve, reject) => {
      update(body, {
        onSuccess: data => resolve(data),
        onError: error => reject(error)
      })
    })
    toast.promise(mutationPromise, {
      loading: 'Mengirim data formulir pencairan...',
      success: 'Formulir pencairan berhasil dikirim',
      error: 'Terjadi kesalahan'
    })

    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }} scroll='body'>
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Formulir Pencairan
        <Typography component='span' className='flex flex-col text-center'>
          Isi formulir pencairan untuk melanjutkan proses pengajuan bantuan
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className='overflow-visible pbs-0 p-6 sm:pli-16'>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Controller
                control={control}
                name='vendor_invoice'
                render={({ field }) => (
                  <FormControlLabel
                    label='Invoice Vendor'
                    labelPlacement='end'
                    control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                  />
                )}
              />
            </Grid>
            <Grid item sm={12}>
              <Controller
                control={control}
                name='vendor_account_appointment_letter'
                render={({ field }) => (
                  <FormControlLabel
                    label='Surat Penunjukan Rekening Vendor'
                    labelPlacement='end'
                    control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                  />
                )}
              />
            </Grid>
            <Grid item sm={12}>
              <Controller
                control={control}
                name='saving_book'
                render={({ field }) => (
                  <FormControlLabel
                    label='Copy Buku Tabungan'
                    labelPlacement='end'
                    control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                  />
                )}
              />
            </Grid>
            <Grid item sm={12}>
              <Controller
                control={control}
                name='bast'
                render={({ field }) => (
                  <FormControlLabel
                    label='BAST'
                    labelPlacement='end'
                    control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                  />
                )}
              />
            </Grid>
            {data?.nominal > 25000000 && (
              <Grid item sm={12}>
                <Controller
                  control={control}
                  name='statement_letter'
                  render={({ field }) => (
                    <FormControlLabel
                      label='Surat Pernyataan'
                      labelPlacement='end'
                      control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                    />
                  )}
                />
              </Grid>
            )}
            {data?.nominal >= 50000000 && (
              <Grid item sm={12}>
                <Controller
                  control={control}
                  name='usage_report'
                  render={({ field }) => (
                    <FormControlLabel
                      label='Laporan Penggunaan Bantuan PSBI'
                      labelPlacement='end'
                      control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 p-6 sm:pbe-16 sm:pli-16'>
          <LoadingButton loading={isUpdating} variant='contained' type='submit'>
            Submit
          </LoadingButton>
          <Button variant='tonal' type='reset' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default FormPencairanDialog
