import { Schema, Document } from "mongoose";

// Define a TypeScript interface for the timestamps
interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

// Define a Mongoose schema and add the timestamps fields
function addTimestamps<T extends Document>(schema: any): void {
  // Extend the schema type definition with the timestamps fields
  schema.add({
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  });

  // Create a pre-save hook
  schema.pre("save", function (this: any, next: () => void) {
    const now = Date.now();

    this.updatedAt = now;
    // Set a value for createdAt only if it is null
    if (!this.createdAt) {
      this.createdAt = now;
    }

    // Call the next function in the pre-save chain
    next();
  });
}

export { Timestamps, addTimestamps };
