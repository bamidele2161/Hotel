// model for compliance services supported by sidebrief

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const serviceTemplates = new Schema({
  templateName: {
    type: String,
    required: [true, "Please provide the template name"],
    trim: true,
    text: true,
  },
  templateType: {
    type: String,
    required: [true, "Please provide the template type"],
    trim: true,
    text: true,
  },
  templateLink: {
    type: String,
    required: [true, "Please provide the template type"],
    trim: true,
    text: true,
  },

  fileName: {
    type: String,
    required: [true, "Please provide the template name"],
    trim: true,
    text: true,
  },

  fileType: {
    type: String,
    required: [true, "Please provide the file type"],
    trim: true,
    text: true,
  },

  templateCode: {
    type: String,
    required: [true, "Please provide the document code"],
    trim: true,
    text: true,
  },
});

const serviceForm = new Schema({
  fieldQuestion: {
    type: String,
    required: [true, "Please provide the question"],
    trim: true,
    text: true,
  },
  fieldType: {
    type: String,
    required: [true, "Please provide the field type"],
    trim: true,
    text: true,
  },
  fieldName: {
    type: String,
    required: [true, "Please provide the field name"],
    trim: true,
    text: true,
  },
  fieldRequired: {
    type: Boolean,
    required: [true, "Please provide the field required"],
  },
  fieldOptions: {
    type: Array,
    required: [true, "Please provide the field options"],
    trim: true,
    text: true,
  },
  fieldCode: {
    type: String,
    required: [true, "Please provide the field code"],
    trim: true,
    text: true,
  },
});

const serviceRequirements = new Schema({
  requirementName: {
    type: String,
    required: [true, "Please provide the document url"],
    trim: true,
    text: true,
  },

  requirementDescription: {
    type: String,
    required: [true, "Please provide the document name"],
    trim: true,
    text: true,
  },
  capitalizedName: {
    type: String,
    required: [true, "Please provide the capitalized name"],
    trim: true,
    text: true,
  },
  requirementCode: {
    type: String,
    required: [true, "Please provide the requirement code"],
    trim: true,
    text: true,
  },
});

const serviceSubCategory = new Schema({
  serviceType: {
    type: String,
    required: [true, "Please provide the document url"],
    trim: true,
    text: true,
  },

  servicePrice: {
    type: Number,
    required: [true, "Please enter the service price"],
    min: 3,
    max: 10000000000,
    trim: true,
    text: true,
  },

  serviceCurrency: {
    type: String,
    required: [true, "Please enter the service currency"],
    min: 3,
    max: 30,
    trim: true,
    text: true,
  },

  serviceTimeline: {
    type: String,
    required: [true, "Please enter the service timeline"],
    min: 3,
    max: 30,
    trim: true,
    text: true,
  },
  serviceFeatures: {
    type: String,
    required: [true, "Please enter the service features"],
    min: 3,
    max: 30,
    trim: true,
    text: true,
  },
});

var serviceSchema = new Schema(
  {
    serviceId: {
      type: String,
      required: [true, "Please enter the service ID"],
      min: 3,
      max: 30,
      trim: true,
      text: true,
    },

    serviceName: {
      type: String,
      required: [true, "Please enter the service name"],
      min: 3,
      max: 100,
      trim: true,
      text: true,
    },

    serviceDescription: {
      type: String,
      required: [true, "Please enter the service description"],
      min: 3,
      max: 250,
      trim: true,
      text: true,
    },

    serviceCountry: {
      type: String,
      required: [true, "Please enter the service country"],
      min: 3,
      max: 30,
      trim: true,
      text: true,
    },

    serviceCategory: {
      type: String,
      required: [true, "Please enter the service category"],
      min: 3,
      max: 30,
      trim: true,
      text: true,
    },
    serviceSubCategory: [serviceSubCategory],
    serviceRequirements: [serviceRequirements],
    serviceForm: [serviceForm],
    serviceTemplates: [serviceTemplates],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
