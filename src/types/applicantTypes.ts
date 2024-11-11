export enum ApplicantStatusEnum {
  DRAFT = 'DRAFT',
  MENUNGGU_KONFIRMASI_DARI_PENYELIA = 'MENUNGGU_KONFIRMASI_DARI_PENYELIA',
  SIAP_UNTUK_MENGISI_FORM_PRINSIP = 'SIAP_UNTUK_MENGISI_FORM_PRINSIP',
  SIAP_UNTUK_MENGISI_FORM_SPESIFIKASI = 'SIAP_UNTUK_MENGISI_FORM_SPESIFIKASI',
  SIAP_UNTUK_MENGISI_FORM_PENCAIRAN = 'SIAP_UNTUK_MENGISI_FORM_PENCAIRAN',
  SIAP_UNTUK_MENGISI_FORM_PERTANGGUNGJAWABAN = 'SIAP_UNTUK_MENGISI_FORM_PERTANGGUNGJAWABAN',
  DITOLAK = 'DITOLAK',
  SELESAI = 'SELESAI'
}

export enum ApplicantStageEnum {
  SURVEY = 'SURVEY',
  PRINSIP = 'PRINSIP',
  SPESIFIKASI = 'SPESIFIKASI',
  PENCAIRAN = 'PENCAIRAN',
  PERTANGGUNGJAWABAN = 'PERTANGGUNGJAWABAN'
}

export enum ApplicantOwnershipStatusEnum {
  BADAN_USAHA = 'BADAN_USAHA',
  PERORANGAN = 'PERORANGAN'
}

export enum ApplicantPsbiScopeEnum {
  PENDIDIKAN = 'PENDIDIKAN',
  KEAGAMAAN = 'KEAGAMAAN',
  KEBUDAYAAN = 'KEBUDAYAAN',
  KESEHATAN = 'KESEHATAN',
  LINGKUNGAN_HIDUP = 'LINGKUNGAN_HIDUP',
  BENCANA_ALAM = 'BENCANA_ALAM',
  PENINGKATAN_KAPASITAS_EKONOMI = 'PENINGKATAN_KAPASITAS_EKONOMI',
  PENINGKATAN_KAPASITAS_SDM = 'PENINGKATAN_KAPASITAS_SDM',
  PARTISIPASI_EDUKASI_PUBLIK = 'PARTISIPASI_EDUKASI_PUBLIK'
}

export enum ApplicantRequestedFundEnum {
  SARANA_PRASARANA = 'SARANA_PRASARANA',
  INFRASTRUKTUR_BANGUNAN = 'INFRASTRUKTUR_BANGUNAN',
  LAINNYA = 'LAINNYA'
}

export enum ApplicantSourceOfFundEnum {
  IURAN = 'IURAN',
  SUMBANGAN = 'SUMBANGAN',
  LAINNYA = 'LAINNYA'
}

export enum ApplicantRequiredFundHasBeenObtainedFromEnum {
  DANA_LEMBAGA = 'DANA_LEMBAGA',
  SUMBANGAN_DARI_INSTANSI = 'SUMBANGAN_DARI_INSTANSI'
}

export enum ApplicantInstitutionTypeEnum {
  PAUD = 'PAUD',
  TK = 'TK',
  SD = 'SD',
  SMP = 'SMP',
  SMA = 'SMA',
  PERGURUAN_TINGGI = 'PERGURUAN_TINGGI',
  PONDOK_PESANTREN = 'PONDOK_PESANTREN',
  MASJID_MUSHOLA = 'MASJID_MUSHOLA',
  GEREJA = 'GEREJA',
  PURA = 'PURA',
  WIHARA = 'WIHARA',
  KELOMPOK_USAHA = 'KELOMPOK_USAHA',
  KELOMPOK_SENI_TRADISIONAL = 'KELOMPOK_SENI_TRADISIONAL',
  LAINNYA_PENDIDIKAN = 'LAINNYA_PENDIDIKAN',
  LAINNYA_KEAGAMAAN = 'LAINNYA_KEAGAMAAN',
  LAINNYA_LEMBAGA = 'LAINNYA_LEMBAGA'
}

export enum PsbiClassificationEnum {
  PSEP = 'PSEP',
  PEP = 'PEP',
  KEPSOS = 'KEPSOS',
  PEM = 'PEM'
}

export enum PsbiProposedFundEnum {
  DANA = 'DANA',
  BARANG = 'BARANG',
  KONSTRUKSI = 'KONSTRUKSI'
}

export type ApplicantType = {
  id?: string
  code?: string

  // Survey
  name?: string | null
  activity_name?: string | null
  province?: string | null
  city?: string | null
  subdistrict?: string | null
  village?: string | null
  address?: string | null
  contact?: string | null
  institution_type?: string[] | null
  other_institution_education_type?: string | null
  other_institution_religion_type?: string | null
  other_institution_type?: string | null
  psbi_scope?: `${ApplicantPsbiScopeEnum}`[]
  year_founded?: number | null
  ownership_status?: `${ApplicantOwnershipStatusEnum}` | null
  have_committee?: boolean
  carried_out_activities?: string | null
  number_of_members?: number | null
  number_of_committee?: number | null
  source_of_fund?: string | null
  requested_fund?: `${ApplicantRequestedFundEnum}` | null
  requested_fund_priority?: string | null
  activity_goals?: string | null
  number_of_beneficiaries?: number | null
  required_funds?: number | null
  required_funds_has_been_obtained_from?: `${ApplicantRequiredFundHasBeenObtainedFromEnum}`[]
  is_approved_by_surveyor?: boolean
  surveyor_name?: string | null
  survey_photo_1?: string | null
  survey_photo_2?: string | null
  survey_photo_3?: string | null

  // Principle
  principle_memo_number?: string | null
  principle_memo_date?: string | null
  principle_memo_regard?: string | null
  principle_writed_by?: string | null
  principle_prepared_by?: string | null
  principle_checked_by?: string | null
  principle_supported_by?: string | null
  principle_approved_by?: string | null
  psbi_classification?: `${PsbiClassificationEnum}`
  proposed_fund?: `${PsbiProposedFundEnum}`
  proposed_fund_item?:
    | {
        item_name: string
        item_quantity: number
      }[]
    | null
  proposed_fund_construction?:
    | {
        service_name: string
        volume: string
      }[]
    | null
  proposed_fund_nominal?: number

  // Spesification
  specification_memo_number?: string | null
  specification_memo_date?: string | null
  specification_memo_regard?: string | null
  specification_writed_by?: string | null
  specification_prepared_by?: string | null
  specification_checked_by?: string | null
  specification_supported_by?: string | null
  specification_approved_by?: string | null
  vendor?:
    | {
        vendor_name: string
        letter_number: string
        letter_date: string
      }[]
    | null
  spk?:
    | {
        choosed_vendor: string
        spk_number: string
        date: string
        approved_amount: number
        address: string
        phone_number_vendor: string
      }[]
    | null
  notification_letter_number?: string | null
  notification_letter_date?: string | null
  notification_letter_signatory?: string | null
  fund_nominal: number

  // Liquefaction
  liquefaction_memo_number?: string | null
  liquefaction_memo_date?: string | null
  liquefaction_memo_regard?: string | null
  liquefaction_writed_by?: string | null
  liquefaction_prepared_by?: string | null
  liquefaction_checked_by?: string | null
  liquefaction_supported_by?: string | null
  liquefaction_approved_by?: string | null
  ld_bi_erp_number?: string | null
  ld_bi_erp_date?: string | null
  ld_bi_erp_regard?: string | null
  fund_recap_number?: string | null
  fund_recap_date?: string | null
  fund_recap_regard?: string | null
  invoice?: boolean
  non_pkp_tax_invoice?: boolean
  account_appointment_letter?: boolean
  saving_book?: boolean
  npwp?: boolean
  ktp?: boolean
  is_distributed?: boolean

  // Accountability
  bast?: boolean
  statement_letter?: boolean
  usage_report?: boolean

  stage?: `${ApplicantStageEnum}`
  status?: `${ApplicantStatusEnum}`
}

export type ApplicantFormSurveyDataType = {
  name: string
  activity_name: string
  province: string
  city: string
  subdistrict: string
  village: string
  address: string
  contact: string
  institution_type: string[]
  other_institution_education_type: string
  other_institution_religion_type: string
  other_institution_type: string
  psbi_scope: `${ApplicantPsbiScopeEnum}`[]
  year_founded: number
  ownership_status: `${ApplicantOwnershipStatusEnum}`
  have_committee: boolean
  carried_out_activities: string
  number_of_members: number
  number_of_committee: number
  source_of_fund: string
  other_source_of_fund: string
  requested_fund: `${ApplicantRequestedFundEnum}`
  requested_fund_priority: string
  activity_goals: string
  number_of_beneficiaries: number
  required_funds: number
  required_funds_has_been_obtained_from: `${ApplicantRequiredFundHasBeenObtainedFromEnum}`[]
  is_approved_by_surveyor: boolean
  surveyor_name: string
  survey_photo_1: string | null
  survey_photo_2: string | null
  survey_photo_3: string | null
}

export type ApplicantFormPrinsipDataType = {
  principle_memo_number: string
  principle_memo_date: Date | null
  principle_memo_regard: string
  principle_writed_by: string
  principle_prepared_by: string
  principle_checked_by: string
  principle_supported_by: string
  principle_approved_by: string
  psbi_classification: `${PsbiClassificationEnum}`
  proposed_fund: `${PsbiProposedFundEnum}`
  proposed_fund_item: {
    item_name: string
    item_quantity: number
  }[]

  proposed_fund_construction: {
    service_name: string
    volume: number
  }[]
  proposed_fund_nominal: number
}

export type ApplicantFormSpesifikasiDataType = {
  specification_memo_number: string
  specification_memo_date: Date | null
  specification_memo_regard: string
  specification_writed_by: string
  specification_prepared_by: string
  specification_checked_by: string
  specification_supported_by: string
  specification_approved_by: string
  vendor: {
    vendor_name: string
    letter_number: string
    letter_date: Date | null
  }[]
  spk: {
    choosed_vendor: string
    spk_number: string
    date: Date | null
    approved_amount: number
    address: string
    phone_number_vendor: string
  }[]
  notification_letter_number: string
  notification_letter_date: Date | null
  notification_letter_signatory: string
  fund_nominal: number
}

export type ApplicantFormPencairanDataType = {
  liquefaction_memo_number: string
  liquefaction_memo_date: Date | null
  liquefaction_memo_regard: string
  liquefaction_writed_by: string
  liquefaction_prepared_by: string
  liquefaction_checked_by: string
  liquefaction_supported_by: string
  liquefaction_approved_by: string
  ld_bi_erp_number: string
  ld_bi_erp_date: Date | null
  ld_bi_erp_regard: string
  fund_recap_number: string
  fund_recap_date: Date | null
  fund_recap_regard: string
  invoice: boolean
  non_pkp_tax_invoice: boolean
  account_appointment_letter: boolean
  saving_book: boolean
  npwp: boolean
  ktp: boolean
  is_distributed: boolean
}

export type ApplicantFormPertanggungjawabanDataType = {
  bast: boolean
  statement_letter: boolean
  usage_report: boolean
}
