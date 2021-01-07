const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  website: {
    type: String
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  requirements: {
    pcat: {
      type: String
    },
    pcatMin: {
      type: String
    },
    degree: {
      type: String
    },
    gpaMin: {
      type: String
    },
    minHours: {
      type: String
    },
    minScience: {
      type: String
    },
    letters: {
      type: String
    },
    pharmLetter: {
      type: String
    },
    observationHours: {
      type: String
    }
  },
  private: {
    type: String,
  },
  deadline: {
    type: String,
  },
  length: {
    type: String,
  },
  medSchool: {
    type: String
  },
  description: {
    0: {
      type: String
    },
    1: {
      type: String
    },
    2: {
      type: String
    },
    3: {
      type: String
    },
  }


});

module.exports = mongoose.model('Registration', registrationSchema);