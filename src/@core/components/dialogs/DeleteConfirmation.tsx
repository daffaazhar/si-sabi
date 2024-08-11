// MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import LoadingButton from '@mui/lab/LoadingButton'
import type { UseMutateFunction } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const DeleteConfirmation = ({
  open,
  setOpen,
  data,
  mutate,
  isDeleting
}: {
  open: boolean
  setOpen: (open: boolean) => void
  data: any
  mutate: UseMutateFunction
  isDeleting: boolean
}) => {
  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    const mutationPromise = new Promise((resolve, reject) => {
      mutate(data.row.original._id, {
        onSuccess: data => resolve(data),
        onError: error => reject(error)
      })
    })
    toast.promise(mutationPromise, {
      loading: 'Menghapus data pemohon...',
      success: 'Data pemohon berhasil dihapus!',
      error: err => `Terjadi kesalahan: ${err.toString()}`
    })
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Yakin ingin menghapus?</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Item yang telah dihapus tidak dapat dikembalikan lagi
        </DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={handleClose}>Batal</Button>
        <LoadingButton loading={isDeleting} onClick={handleDelete}>
          Ya, Hapus!
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmation
