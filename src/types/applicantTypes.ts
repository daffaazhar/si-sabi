export enum ApplicantStatusEnum {
  MENUNGGU_KONFIRMASI_DARI_PENYELIA = 'MENUNGGU KONFIRMASI DARI PENYELIA',
  SIAP_UNTUK_MENGISI_FORM_PRINSIP = 'SIAP UNTUK MENGISI FORM PRINSIP',
  SIAP_UNTUK_MENGISI_FORM_SPESIFIKASI = 'SIAP UNTUK MENGISI FORM SPESIFIKASI',
  SIAP_UNTUK_MENGISI_FORM_PENCAIRAN = 'SIAP UNTUK MENGISI FORM PENCAIRAN',
  DITOLAK = 'DITOLAK',
  SELESAI = 'SELESAI'
}

export enum ApplicantStageEnum {
  SURVEY = 'SURVEY',
  PRINSIP = 'PRINSIP',
  SPESIFIKASI = 'SPESIFIKASI',
  PENCAIRAN = 'PENCAIRAN'
}

export type ApplicantType = {
  id?: string
  name?: string | null
  date?: string | null
  regarding?: string | null
  coordinator?: string | null
  vendor_bid_documents?: boolean | null
  vendor_spk?: boolean | null
  notification_letter?: boolean | null
  nominal?: number | null
  vendor_invoice?: boolean | null
  vendor_account_appointment_letter?: boolean | null
  saving_book?: boolean | null
  bast?: boolean | null
  statement_letter?: boolean | null
  usage_report?: boolean | null
  stage: `${ApplicantStageEnum}`
  status?: `${ApplicantStatusEnum}`
}
