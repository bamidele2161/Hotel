const Service = require("../../model/hotel/tttt");

exports.testCreate = async (req, res) => {
  try {
    const {
      serviceName,
      serviceDescription,
      serviceCountry,
      serviceCategory,
      serviceSubCategory,
    } = req.body;
    // generate a serviceId

    var serviceId = 123458;

    const newService = new Service({
      serviceId,
      serviceName,
      serviceDescription,
      serviceCountry,
      serviceCategory,
      serviceSubCategory,
    });

    const savedService = await newService.save();
    res.status(200).json(savedService);
  } catch (error) {
    res.status(400).json({ message: "Error occured" });
  }
};
