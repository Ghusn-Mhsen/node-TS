import { Request, Response, NextFunction } from "express";
import CityRepo from "../repositories/CityRepo";
import { HttpStatus } from "../utils/httpStatus";


export default class CityCtrl {
  constructor() {}

  async getAllCities(req: Request, res: Response, next: NextFunction) {
    try {
      const cityList = await CityRepo.getAllCities();
      res.status(HttpStatus.SUCCESS.code).json({
        message: HttpStatus.SUCCESS.description,
        data: cityList,
      });

      console.log(cityList);
    } catch (error) {
      res.status(HttpStatus.SERVER_ERROR.code).json({
        status: HttpStatus.SERVER_ERROR.code,
        message: HttpStatus.SERVER_ERROR.description,
        error: `${error}`,
      });
    }
  }

  async getCityById(req: Request, res: Response, next: NextFunction) {
    try {
      const city = await CityRepo.getById(req.params.id);
      if (city) {
        res.status(HttpStatus.SUCCESS.code).json({
          message: HttpStatus.SUCCESS.description,
          data: city,
        });
      } else {
        res.status(HttpStatus.NOT_FOUND.code).json({
          message: "City not found",
        });
      }
    } catch (error) {
      res.status(HttpStatus.SERVER_ERROR.code).json({
        status: HttpStatus.SERVER_ERROR.code,
        message: HttpStatus.SERVER_ERROR.description,
        error: `${error}`,
      });
    }
  }

  async updateCity(req: Request, res: Response, next: NextFunction) {
    try {
      const cityId = req.params.id;
      const updates = req.body;
      const updatedCity = await CityRepo.updateCity(cityId, updates);
      res.status(HttpStatus.SUCCESS.code).json({
        message: HttpStatus.SUCCESS.description,
        data: updatedCity,
      });
    } catch (error) {
      res.status(HttpStatus.SERVER_ERROR.code).json({
        status: HttpStatus.SERVER_ERROR.code,
        message: HttpStatus.SERVER_ERROR.description,
        error: `${error}`,
      });
    }
  }

  async deleteCity(req: Request, res: Response, next: NextFunction) {
    try {
      const cityId = req.params.id;

      // Retrieve the city information before deleting it
      const deletedCity = await CityRepo.getById(cityId);

      if (!deletedCity) {
        // If the city doesn't exist, return an appropriate response
        return res.status(HttpStatus.NOT_FOUND.code).json({
          message: "City not found",
        });
      }

      // Delete the city
      await CityRepo.deleteCity(cityId);

      // Return the deleted city information
      res.status(HttpStatus.SUCCESS.code).json({
        message: HttpStatus.SUCCESS.description,
        data: deletedCity,
      });
    } catch (error) {
      res.status(HttpStatus.SERVER_ERROR.code).json({
        status: HttpStatus.SERVER_ERROR.code,
        message: HttpStatus.SERVER_ERROR.description,
        error: `${error}`,
      });
    }
  }

  async addCity(req: Request, res: Response, next: NextFunction) {
    try {
      const cityData = req.body;
      const newCity = await CityRepo.addCity(cityData);
      res.status(HttpStatus.SUCCESS.code).json({
        message: HttpStatus.SUCCESS.description,
        data: newCity,
      });
    } catch (error) {
      res.status(HttpStatus.SERVER_ERROR.code).json({
        status: HttpStatus.SERVER_ERROR.code,
        message: HttpStatus.SERVER_ERROR.description,
        error: `${error}`,
      });
    }
  }
}
