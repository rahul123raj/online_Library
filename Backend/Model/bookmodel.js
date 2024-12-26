const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
    { // Use `id` as the primary key (_id)
  title: String,
  isbn: String,
  pageCount: Number,
  publishedDate: {
    $date: String,
  },
  thumbnailUrl: String,
  shortDescription: String,
  longDescription: String,
  status: String,
  authors: [{ type: String }],
  categories: [{ type: String }],
    },
    {
      timestamps: true
    }
)

exports.bookModel = mongoose.model('Books',bookSchema)