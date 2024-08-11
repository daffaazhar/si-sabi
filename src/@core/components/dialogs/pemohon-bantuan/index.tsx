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
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

// Component Imports
import LoadingButton from '@mui/lab/LoadingButton'
import DialogCloseButton from '../DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

// Hook Imports
import { useCreateApplicant } from '@/hooks/applicant/useCreateApplicant'
import { useUpdateApplicant } from '@/hooks/applicant/useUpdateApplicant'

type PemohonBantuanProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: any
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'Nama pemohon harus diisi' })
  // startFrom: z
  //   .number({ invalid_type_error: 'Mulai dari harus diisi' })
  //   .nonnegative('Nilai mulai dari tidak boleh negatif'),
  // endFrom: z
  //   .number({ invalid_type_error: 'Sampai dengan harus diisi' })
  //   .nonnegative('Nilai sampai dengan tidak boleh negatif')
})

const PemohonBantuan = ({ open, setOpen, data }: PemohonBantuanProps) => {
  const { mutate: create, isPending: isCreating } = useCreateApplicant()
  const { mutate: update, isPending: isUpdating } = useUpdateApplicant()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? ''
    }
  })

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = (body: any) => {
    if (data) {
      body.id = data?._id
      const mutationPromise = new Promise((resolve, reject) => {
        update(body, {
          onSuccess: data => resolve(data),
          onError: error => reject(error)
        })
      })
      toast.promise(mutationPromise, {
        loading: 'Mengubah data pemohon...',
        success: 'Data pemohon berhasil diubah!',
        error: err => `Terjadi kesalahan: ${err.toString()}`
      })
    } else {
      const mutationPromise = new Promise((resolve, reject) => {
        create(body, {
          onSuccess: data => resolve(data),
          onError: error => reject(error)
        })
      })
      toast.promise(mutationPromise, {
        loading: 'Menyimpan data pemohon...',
        success: 'Data pemohon berhasil disimpan!',
        error: err => `Terjadi kesalahan: ${err.toString()}`
      })
    }

    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {data ? 'Ubah Pemohon' : 'Tambah Pemohon Baru'}
        <Typography component='span' className='flex flex-col text-center'>
          {data ? 'Ubah data pemohon yang telah tersimpan' : 'Tambah data pemohon baru'}
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className='overflow-visible pbs-0 p-6 sm:pli-16'>
          <Grid container spacing={6}>
            <Grid item sm={12}>
              <CustomTextField
                fullWidth
                label='Nama Pemohon'
                autoComplete='off'
                placeholder='Masukkan nama pemohon'
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 p-6 sm:pbe-16 sm:pli-16'>
          <LoadingButton loading={isCreating || isUpdating} variant='contained' type='submit'>
            {data ? 'Update' : 'Submit'}
          </LoadingButton>
          <Button variant='tonal' type='reset' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default PemohonBantuan
