'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { IconButton, InputAdornment } from '@mui/material'

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
import { useRegister } from '@/hooks/auth/useRegister'
import { useUpdateUser } from '@/hooks/user/useUpdateUser'

type PenggunaDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: any
}

const PenggunaDialog = ({ open, setOpen, data }: PenggunaDialogProps) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  // Hooks
  const { mutate: create, isPending: isCreating } = useRegister()
  const { mutate: update, isPending: isUpdating } = useUpdateUser()

  // Form Schema
  const formSchema = z.object({
    name: z.string().min(1, { message: 'Nama harus diisi' }),
    email: z.string().min(1, { message: 'Email harus diisi' }).email('Email tidak valid'),
    password: data ? z.string().optional() : z.string().min(1, { message: 'Password harus diisi' }),
    role: z.enum(['STAFF', 'PENYELIA', 'ADMIN'])
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? '',
      email: data?.email ?? '',
      password: data?.password ?? '',
      role: data?.role ?? 'STAFF'
    }
  })

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

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
        loading: 'Mengubah data pengguna...',
        success: 'Data pengguna berhasil diubah!',
        error: 'Terjadi kesalahan'
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
        {data ? 'Ubah Pengguna' : 'Tambah Pengguna Baru'}
        <Typography component='span' className='flex flex-col text-center'>
          {data ? 'Ubah data pengguna yang telah tersimpan' : 'Tambah data pengguna baru'}
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className='overflow-visible pbs-0 p-6 sm:pli-16'>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <CustomTextField
                fullWidth
                label='Nama'
                autoComplete='off'
                placeholder='Masukkan nama pengguna'
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item sm={12}>
              <CustomTextField
                fullWidth
                label='Email'
                autoComplete='off'
                placeholder='example@gmail.com'
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            {!data && (
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Password'
                  placeholder='············'
                  id='outlined-adornment-password'
                  type={isPasswordShown ? 'text' : 'password'}
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                          <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            )}

            <Grid item sm={12}>
              <CustomTextField
                select
                fullWidth
                label='Peran'
                id='custom-select'
                defaultValue={data?.role ?? 'STAFF'}
                {...register('role')}
                error={!!errors.role}
                helperText={errors.role?.message}
              >
                <MenuItem value='STAFF'>STAFF</MenuItem>
                <MenuItem value='PENYELIA'>PENYELIA</MenuItem>
              </CustomTextField>
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

export default PenggunaDialog
