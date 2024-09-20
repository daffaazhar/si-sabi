import { Schema, model, models } from 'mongoose'

const ApplicantSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    // Survey
    name: {
      type: String,
      required: true
    },
    activity_name: {
      type: String,
      required: true
    },
    province: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    subdistrict: {
      type: String,
      required: true
    },
    village: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    institution_type: {
      type: [String]
    },
    other_institution_education_type: String,
    other_institution_religion_type: String,
    other_institution_type: String,
    psbi_scope: {
      type: [String],
      enum: [
        'PENDIDIKAN',
        'KEAGAMAAN',
        'KEBUDAYAAN',
        'KESEHATAN',
        'LINGKUNGAN_HIDUP',
        'BENCANA_ALAM',
        'PENINGKATAN_KAPASITAS_EKONOMI',
        'PENINGKATAN_KAPASITAS_SDM',
        'PARTISIPASI_EDUKASI_PUBLIK'
      ]
    },
    year_founded: {
      type: Number
    },
    ownership_status: {
      type: String,
      enum: ['BADAN_USAHA', 'PERORANGAN']
    },
    have_committee: {
      type: Boolean
    },
    carried_out_activities: {
      type: String
    },
    number_of_members: {
      type: Number
    },
    number_of_committee: {
      type: Number
    },
    source_of_fund: {
      type: String
    },
    other_source_of_fund: String,
    requested_fund: {
      type: String,
      enum: ['SARANA_PRASARANA', 'INFRASTRUKTUR_BANGUNAN', 'LAINNYA']
    },
    requested_fund_priority: {
      type: String
    },
    activity_goals: {
      type: String
    },
    number_of_beneficiaries: {
      type: Number
    },
    required_funds: {
      type: Number
    },
    required_funds_has_been_obtained_from: {
      type: [String],
      enum: ['DANA_LEMBAGA', 'SUMBANGAN_DARI_INSTANSI']
    },
    is_approved_by_surveyor: {
      type: Boolean
    },
    surveyor_name: {
      type: String
    },

    // Principle
    principle_memo_number: String,
    principle_memo_date: String,
    principle_memo_regard: String,
    principle_writed_by: String,
    principle_prepared_by: String,
    principle_checked_by: String,
    principle_supported_by: String,
    principle_approved_by: String,
    psbi_classification: {
      type: String,
      enum: ['PSEP', 'PEP', 'KEPSOS', 'PEM']
    },
    proposed_fund: {
      type: String,
      enum: ['DANA', 'BARANG', 'KONSTRUKSI']
    },
    proposed_fund_item: {
      type: [
        {
          item_name: String,
          item_quantity: Number
        }
      ]
    },
    proposed_fund_construction: {
      type: [
        {
          service_name: String,
          volume: Number
        }
      ]
    },
    proposed_fund_nominal: Number,

    // Specification
    specification_memo_number: String,
    specification_memo_date: String,
    specification_memo_regard: String,
    specification_writed_by: String,
    specification_prepared_by: String,
    specification_checked_by: String,
    specification_supported_by: String,
    specification_approved_by: String,
    vendor: {
      type: [
        {
          vendor_name: String,
          letter_number: String,
          letter_date: String
        }
      ]
    },
    spk: {
      type: [
        {
          choosed_vendor: String,
          spk_number: String,
          date: String,
          approved_amount: Number,
          address: String,
          phone_number_vendor: String
        }
      ]
    },
    notification_letter_number: String,
    notification_letter_date: String,
    notification_letter_signatory: String,
    fund_nominal: Number,

    // Liquefaction
    liquefaction_memo_number: String,
    liquefaction_memo_date: String,
    liquefaction_memo_regard: String,
    liquefaction_writed_by: String,
    liquefaction_prepared_by: String,
    liquefaction_checked_by: String,
    liquefaction_supported_by: String,
    liquefaction_approved_by: String,
    ld_bi_erp_number: String,
    ld_bi_erp_date: String,
    ld_bi_erp_regard: String,
    fund_recap_number: String,
    fund_recap_date: String,
    fund_recap_regard: String,
    invoice: Boolean,
    non_pkp_tax_invoice: Boolean,
    account_appointment_letter: Boolean,
    saving_book: Boolean,
    npwp: Boolean,
    ktp: Boolean,
    is_distributed: Boolean,

    // Accountability
    bast: Boolean,
    statement_letter: Boolean,
    usage_report: Boolean,

    stage: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Applicant = models.Applicant || model('Applicant', ApplicantSchema)

export default Applicant
