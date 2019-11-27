import mongoose from 'mongoose'
import moment from 'moment'

export const tripSchema = mongoose.Schema(
  {
    destination: {
      type: String,
      required: 'Name is required',
      trim: true,
    },
    startDate: {
      type: Date,
      required: 'Start date is required',
    },
    endDate: {
      type: Date,
      required: 'End date is required',
    },
    comment: {
      type: String,
      trim: true,
      required: 'Comment is required',
    },
  },
  { timestamps: true },
)

tripSchema.pre('save', function(next) {
  this.startDate = moment(this.startDate).startOf('day')
  this.endDate = moment(this.endDate).startOf('day')
  next()
})

// Schema methods
tripSchema.methods.toClient = function() {
  return {
    id: this._id,
    destination: this.destination,
    startDate: this.startDate,
    endDate: this.endDate,
    comment: this.comment,
    updatedAt: this.updatedAt,
  }
}

// Schema statics
tripSchema.statics.validateDates = (startDate, endDate) => {
  if (!startDate) throw new Error('Start date is not valid')
  if (!endDate) throw new Error('End date is not valid')

  const momentStart = moment(startDate)
  const momentEnd = moment(endDate)

  if (!momentStart.isValid()) throw new Error('Start date is not valid')
  if (!momentEnd.isValid()) throw new Error('End date is not valid')
  if (momentEnd.isBefore(momentStart)) {
    throw new Error('Make sure that the Start date comes before the End date.')
  }
}

const Trip = mongoose.model('Trip', tripSchema)

export default Trip
