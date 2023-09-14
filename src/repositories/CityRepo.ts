import CityModel from "../models/city";


interface City extends Document {
  name: string;
  code: string;
 
}

class CityRepo {
  constructor() {}

  getAllCities() {
    return CityModel.find().exec();
  }

  getById(cityId: string) {
    return CityModel.findById(cityId).exec();
  }

  updateCity(cityId: string, updates: Partial<City>) {
    return CityModel.findByIdAndUpdate(cityId, updates, { new: true }).exec();
  }

  deleteCity(cityId: string) {
    return CityModel.findByIdAndDelete(cityId).exec();
  }

  addCity(cityData:  City) {
    const city = new CityModel(cityData);
    return city.save();
  }
}

export default new CityRepo();
