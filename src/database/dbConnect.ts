import { AppDataSource } from "../Utils/appDataSource";

export const dbConnect = () =>
  AppDataSource.initialize()
    .then(() => {
      console.log(`Database connected successfully`);
    })
    .catch((err) => {
      console.log(err);
    });
