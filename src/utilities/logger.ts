import express from 'express';
import { promises as fspromises } from 'fs';

const logger = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const myfile = await fspromises.readFile(
      'src/assets/full/encenadaport.jpg'
    );
    return myfile;
  } catch (err) {
    console.log(err);
  }
  next();
};

export default logger;
