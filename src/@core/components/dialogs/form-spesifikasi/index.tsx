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

type FormSpesifikasiProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: any
}

const formSchema = z.object({
  vendor_bid_documents: z.boolean(),
  vendor_spk: z.boolean(),
  notification_letter: z.boolean(),
  nominal: z.preprocess(
    val => Number(val),
    z.number({
      required_error: 'Nominal harus diisi',
      invalid_type_error: 'Nominal harus berupa angka'
    })
  )
})

const FormSpesifikasiDialog = ({ open, setOpen, data }: FormSpesifikasiProps) => {
  const { mutate: update, isPending: isUpdating } = useUpdateApplicant()

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendor_bid_documents: !!data?.vendor_bid_documents ?? false,
      vendor_spk: !!data?.vendor_spk ?? false,
      notification_letter: !!data?.notification_letter ?? false,
      nominal: data?.nominal ?? 0
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
      loading: 'Mengirim data formulir spesifikasi...',
      success: 'Formulir spesifikasi berhasil dikirim',
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
        Formulir Spesifikasi
        <Typography component='span' className='flex flex-col text-center'>
          Isi formulir prinsip untuk melanjutkan proses pengajuan bantuan
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className='overflow-visible pbs-0 p-6 sm:pli-16'>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Controller
                control={control}
                name='vendor_bid_documents'
                render={({ field }) => (
                  <FormControlLabel
                    label='Dokumen Penawaran Vendor'
                    labelPlacement='end'
                    control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                  />
                )}
              />
            </Grid>
            <Grid item sm={12}>
              <Controller
                control={control}
                name='vendor_spk'
                render={({ field }) => (
                  <FormControlLabel
                    label='SPK Vendor'
                    labelPlacement='end'
                    control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                  />
                )}
              />
            </Grid>
            <Grid item sm={12}>
              <Controller
                control={control}
                name='notification_letter'
                render={({ field }) => (
                  <FormControlLabel
                    label='Surat Pemberitahuan kepada Penerima PSBI'
                    labelPlacement='end'
                    control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                  />
                )}
              />
            </Grid>
            <Grid item sm={12}>
              <FormattedNumberTextField
                hookFormName='nominal'
                control={control}
                formatedOptions={{ prefix: 'Rp ' }}
                textFieldProps={{
                  label: 'Nominal'
                }}
              />
            </Grid>
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

export default FormSpesifikasiDialog
