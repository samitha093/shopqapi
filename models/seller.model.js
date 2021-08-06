const mongoose = require('mongoose');
const express = require('express')
const router = express.Router()
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
  storename: { type: String, required: true },
  storeid: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  province: { type: String, required: true },
  storeuser: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const Seller = mongoose.model('Seller', sellerSchema );

module.exports = Seller;