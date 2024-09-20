import {
  ApplicantInstitutionTypeEnum,
  ApplicantOwnershipStatusEnum,
  ApplicantPsbiScopeEnum,
  ApplicantRequestedFundEnum,
  ApplicantRequiredFundHasBeenObtainedFromEnum,
  ApplicantSourceOfFundEnum,
  ApplicantStageEnum,
  ApplicantStatusEnum,
  PsbiClassificationEnum,
  PsbiProposedFundEnum
} from '@/types/applicantTypes'

export const applicantStatusOptions = [
  { label: 'Draft', value: ApplicantStatusEnum.DRAFT },
  { label: 'Menunggu Konfirmasi dari Penyelia', value: ApplicantStatusEnum.MENUNGGU_KONFIRMASI_DARI_PENYELIA },
  { label: 'Siap untuk Mengisi Form Prinsip', value: ApplicantStatusEnum.SIAP_UNTUK_MENGISI_FORM_PRINSIP },
  { label: 'Siap untuk Mengisi Form Spesifikasi', value: ApplicantStatusEnum.SIAP_UNTUK_MENGISI_FORM_SPESIFIKASI },
  { label: 'Siap untuk Mengisi Form Pencairan', value: ApplicantStatusEnum.SIAP_UNTUK_MENGISI_FORM_PENCAIRAN },
  {
    label: 'Siap untuk Mengisi Form Pertanggungjawaban',
    value: ApplicantStatusEnum.SIAP_UNTUK_MENGISI_FORM_PERTANGGUNGJAWABAN
  },
  { label: 'Ditolak', value: ApplicantStatusEnum.DITOLAK },
  { label: 'Selesai', value: ApplicantStatusEnum.SELESAI }
]

export const applicantStageOptions = [
  { label: 'Survey', value: ApplicantStageEnum.SURVEY },
  { label: 'Prinsip', value: ApplicantStageEnum.PRINSIP },
  { label: 'Spesifikasi', value: ApplicantStageEnum.SPESIFIKASI },
  { label: 'Pencairan', value: ApplicantStageEnum.PENCAIRAN },
  { label: 'Pertanggungjawaban', value: ApplicantStageEnum.PERTANGGUNGJAWABAN }
]

export const applicantOwnershipStatusOptions = [
  { label: 'Badan Usaha', value: ApplicantOwnershipStatusEnum.BADAN_USAHA },
  { label: 'Perorangan', value: ApplicantOwnershipStatusEnum.PERORANGAN }
]

export const applicantPsbiScopeOptions = [
  { label: 'Pendidikan', value: ApplicantPsbiScopeEnum.PENDIDIKAN },
  { label: 'Keagamaan', value: ApplicantPsbiScopeEnum.KEAGAMAAN },
  { label: 'Kebudayaan', value: ApplicantPsbiScopeEnum.KEBUDAYAAN },
  { label: 'Kesehatan', value: ApplicantPsbiScopeEnum.KESEHATAN },
  { label: 'Lingkungan Hidup', value: ApplicantPsbiScopeEnum.LINGKUNGAN_HIDUP },
  { label: 'Bencana Alam', value: ApplicantPsbiScopeEnum.BENCANA_ALAM },
  { label: 'Peningkatan Kapasitas Ekonomi', value: ApplicantPsbiScopeEnum.PENINGKATAN_KAPASITAS_EKONOMI },
  { label: 'Peningkatan Kapasitas SDM', value: ApplicantPsbiScopeEnum.PENINGKATAN_KAPASITAS_SDM },
  { label: 'Partisipasi Edukasi Publik', value: ApplicantPsbiScopeEnum.PARTISIPASI_EDUKASI_PUBLIK }
]

export const applicantSourceOfFundOptions = [
  { label: 'Iuran', value: ApplicantSourceOfFundEnum.IURAN },
  { label: 'Sumbangan', value: ApplicantSourceOfFundEnum.SUMBANGAN },
  { label: 'Lainnya', value: ApplicantSourceOfFundEnum.LAINNYA }
]

export const applicantInstitutionType = [
  // PENDIDIKAN
  { label: 'PAUD / Kelompok Bermain', value: ApplicantInstitutionTypeEnum.PAUD, category: 'PENDIDIKAN' },
  { label: 'TK / Raudlatul Athfal', value: ApplicantInstitutionTypeEnum.TK, category: 'PENDIDIKAN' },
  { label: 'SD / Madrasah Ibtidyah', value: ApplicantInstitutionTypeEnum.SD, category: 'PENDIDIKAN' },
  { label: 'SMP / Madrasah Tsanawiyah', value: ApplicantInstitutionTypeEnum.SMP, category: 'PENDIDIKAN' },
  { label: 'SMA / Madrasah Aliyah', value: ApplicantInstitutionTypeEnum.SMA, category: 'PENDIDIKAN' },
  { label: 'Perguruan Tinggi', value: ApplicantInstitutionTypeEnum.PERGURUAN_TINGGI, category: 'PENDIDIKAN' },
  { label: 'Pondok Pesantren', value: ApplicantInstitutionTypeEnum.PONDOK_PESANTREN, category: 'PENDIDIKAN' },
  { label: 'Lainnya', value: ApplicantInstitutionTypeEnum.LAINNYA_PENDIDIKAN, category: 'PENDIDIKAN' },

  // KEAGAMAAN
  { label: 'Masjid / Mushola', value: ApplicantInstitutionTypeEnum.MASJID_MUSHOLA, category: 'KEAGAMAAN' },
  { label: 'Gereja', value: ApplicantInstitutionTypeEnum.GEREJA, category: 'KEAGAMAAN' },
  { label: 'Pura', value: ApplicantInstitutionTypeEnum.PURA, category: 'KEAGAMAAN' },
  { label: 'Wihara', value: ApplicantInstitutionTypeEnum.WIHARA, category: 'KEAGAMAAN' },
  { label: 'Lainnya', value: ApplicantInstitutionTypeEnum.LAINNYA_KEAGAMAAN, category: 'KEAGAMAAN' },

  // LEMBAGA
  { label: 'Kelompok Usaha', value: ApplicantInstitutionTypeEnum.KELOMPOK_USAHA, category: 'LEMBAGA' },
  {
    label: 'Kelompok Seni Tradisional',
    value: ApplicantInstitutionTypeEnum.KELOMPOK_SENI_TRADISIONAL,
    category: 'LEMBAGA'
  },
  { label: 'Lainnya', value: ApplicantInstitutionTypeEnum.LAINNYA_LEMBAGA, category: 'LEMBAGA' }
]

export const applicantRequestedFundOptions = [
  { label: 'Sarana Prasarana', value: ApplicantRequestedFundEnum.SARANA_PRASARANA },
  { label: 'Infrastruktur Bangunan', value: ApplicantRequestedFundEnum.INFRASTRUKTUR_BANGUNAN },
  { label: 'Lainnya', value: ApplicantRequestedFundEnum.LAINNYA }
]

export const applicantRequiredFundHasBeenObtainedFromOptions = [
  { label: 'Dana Lembaga', value: ApplicantRequiredFundHasBeenObtainedFromEnum.DANA_LEMBAGA },
  { label: 'Sumbangan dari Instansi', value: ApplicantRequiredFundHasBeenObtainedFromEnum.SUMBANGAN_DARI_INSTANSI }
]

export const psbiClassificationOptions = [
  { label: 'PSEP', value: PsbiClassificationEnum.PSEP },
  { label: 'PEP', value: PsbiClassificationEnum.PEP },
  { label: 'KEPSOS', value: PsbiClassificationEnum.KEPSOS },
  { label: 'PEM', value: PsbiClassificationEnum.PEM }
]

export const psbiProposedFundOptions = [
  { label: 'Dana', value: PsbiProposedFundEnum.DANA },
  { label: 'Barang', value: PsbiProposedFundEnum.BARANG },
  { label: 'Konstruksi', value: PsbiProposedFundEnum.KONSTRUKSI }
]
