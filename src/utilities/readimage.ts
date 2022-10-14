import { promises as fspromises } from 'fs';
import path from 'path';

const readimage = async () => {
  try {
    const myfile = await fspromises.readFile(
      'src/assets/full/encenadaport.jpg'
    );
    console.log(myfile);
    return myfile;
  } catch (err) {
    console.log(err);
  }
};

export default readimage;
