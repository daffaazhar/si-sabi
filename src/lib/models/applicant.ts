import { Schema, model, models } from 'mongoose'

const ApplicantSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    document_number: String,
    date: String,
    regarding: String,
    coordinator: String,
    vendor_bid_documents: Boolean,
    vendor_spk: Boolean,
    notification_letter: Boolean,
    nominal: Number,
    vendor_invoice: Boolean,
    vendor_account_appointment_letter: Boolean,
    saving_book: Boolean,
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
