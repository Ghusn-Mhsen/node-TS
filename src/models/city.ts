import mongoose, { Document, Schema } from "mongoose";
import { addTimestamps, Timestamps } from "../plugins/timestamp";
import * as Joi from "joi";


interface City extends Document {
  name: string;
  code: string;
  
}

const CitySchema = new Schema<City>({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
 
});

// Apply the timestamp plugin
addTimestamps<City & Timestamps>(CitySchema);

const CityModel = mongoose.model<City>("city", CitySchema);



export default CityModel;
