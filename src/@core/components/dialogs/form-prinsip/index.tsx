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
import CustomTextField from '@core/components/mui/TextField'

// Hook Imports
import { useUpdateApplicant } from '@/hooks/applicant/useUpdateApplicant'
import AppReactDatepicker from '@/@menu/styles/AppReactDatepicker'

type FormPrinsipProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: any
}

const formSchema = z.object({
  document_number: z.string().min(1, { message: 'No. Dokumen harus diisi' }),
  date: z.coerce.date(),
  regarding: z.string().min(1, { message: 'Perihal harus diisi' }),
  coordinator: z.string().min(1, { message: 'Penanggung Jawab Dokumen harus diisi' })
})

const FormPrinsipDialog = ({ open, setOpen, data }: FormPrinsipProps) => {
  const { mutate: update, isPending: isUpdating } = useUpdateApplicant()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document_number: data?.document_number ?? '',
      date: !!data?.date ? new Date(data?.date) : null,
      regarding: data?.regarding ?? '',
      coordinator: data?.coordinator ?? ''
    }
  })

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = (body: any) => {
    body.id = data?._id
    const mutationPromise = new Promise((resolve, reject) => {
      update(
        {
          date: new Date(body.date).toISOString(),
          ...body
        },
        {
          onSuccess: data => resolve(data),
          onError: error => reject(error)
        }
      )
    })
    toast.promise(mutationPromise, {
      loading: 'Mengirim data formulir prinsip...',
      success: 'Formulir prinsip berhasil dikirim',
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
        Formulir Prinsip
        <Typography component='span' className='flex flex-col text-center'>
          Isi formulir prinsip untuk melanjutkan proses pengajuan bantuan
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className='overflow-visible pbs-0 p-6 sm:pli-16'>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Controller
                name='date'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <AppReactDatepicker
                      selected={value}
                      showYearDropdown
                      showMonthDropdown
                      onChange={onChange}
                      placeholderText='DD/MM/YYYY'
                      dateFormat={'dd/MM/YYYY'}
                      customInput={
                        <CustomTextField
                          fullWidth
                          value={value}
                          onChange={onChange}
                          autoComplete='off'
                          label='Tanggal'
                          error={!!errors.date}
                          helperText={errors.date?.message}
                        />
                      }
                    />
                  )
                }}
              />
            </Grid>
            <Grid item sm={12}>
              <CustomTextField
                fullWidth
                label='No. Dokumen'
                autoComplete='off'
                placeholder='Masukkan no. dokumen'
                {...register('document_number')}
                error={!!errors.document_number}
                helperText={errors.document_number?.message}
              />
            </Grid>
            <Grid item sm={12}>
              <CustomTextField
                fullWidth
                label='Perihal'
                autoComplete='off'
                placeholder='Masukkan perihal'
                {...register('regarding')}
                error={!!errors.regarding}
                helperText={errors.regarding?.message}
              />
            </Grid>
            <Grid item sm={12}>
              <CustomTextField
                fullWidth
                label='Penanggung Jawab Dokumen'
                autoComplete='off'
                placeholder='Masukkan penanggung jawab dokumen'
                {...register('coordinator')}
                error={!!errors.coordinator}
                helperText={errors.coordinator?.message}
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

export default FormPrinsipDialog
