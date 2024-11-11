import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useDropzone } from 'react-dropzone'
import { UseFormSetValue } from 'react-hook-form'
import Image from 'next/image'

type FileUploaderSingleProps = {
  setValue: UseFormSetValue<any>
  name: string
}

const FileUploaderSingle = ({ setValue, name }: FileUploaderSingleProps) => {
  const [files, setFiles] = useState<File[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
      setValue(name, acceptedFiles[0])
    }
  })

  const img = files.map((file: File) => (
    <Image
      key={file.name}
      alt={file.name}
      className='w-full object-contain'
      src={URL.createObjectURL(file)}
      width={400}
      height={400}
    />
  ))

  return (
    <Box
      {...getRootProps({ className: 'dropzone border border-dashed border-slate-400 rounded-md py-12' })}
      sx={{ border: `1px solid var(--mui-palette-customColors-inputBorder)` }}
    >
      <input {...getInputProps()} />
      {files.length ? (
        img
      ) : (
        <div className='flex items-center flex-col'>
          <Avatar variant='rounded' className='bs-12 is-12 mbe-9'>
            <i className='tabler-upload' />
          </Avatar>
          <Typography variant='h4' className='mbe-2.5'>
            Drop files here or click to upload.
          </Typography>
          <Typography>
            Drop files here or click{' '}
            <a href='/' onClick={e => e.preventDefault()} className='text-textPrimary no-underline'>
              browse
            </a>{' '}
            through your machine
          </Typography>
        </div>
      )}
    </Box>
  )
}

export default FileUploaderSingle
