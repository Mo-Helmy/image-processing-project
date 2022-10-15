import express from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import sharp from 'sharp';

export const getAvailableImagePaths = async (): Promise<string[]> => {
  const availableImages = await fs.readdir(
    path.join(__dirname, '../../../assets/full')
  );
  return availableImages.map((image) => image.split('.')[0]);
};

const images = express.Router();

images.get('/', async (req, res) => {
  //image paths and invalid name error message
  const imageFullPath = path.join(
    __dirname,
    `../../../assets/full/${req.query.filename}.jpg`
  );
  const imageThumbPath = path.join(
    __dirname,
    `../../../assets/thumb/${req.query.filename}-w${req.query.width}-h${req.query.height}.jpg`
  );
  const imageThumbPathWidthOnly = path.join(
    __dirname,
    `../../../assets/thumb/${req.query.filename}-w${req.query.width}.jpg`
  );
  const availableImagePaths = await getAvailableImagePaths();
  const filenameErrMessgae = `<p>please enter a valid image name such as:</P>
                              <p>http://localhost:3000/api/images?filename=[${availableImagePaths}]</p>`;

  if (!req.query.filename) {
    res.send(filenameErrMessgae);
    // if only image file name entered
  } else if (req.query.filename && !req.query.width && !req.query.height) {
    res.sendFile(path.join(imageFullPath), (err) => {
      if (err) {
        res.status(404).send(`<p>${err}:</P>${filenameErrMessgae}`);
      }
    });
  }
  // if image file name & width & height entered
  else if (req.query.filename && req.query.width && req.query.height) {
    try {
      await fs.access(imageThumbPath);
    } catch (err) {
      try {
        await sharp(imageFullPath)
          .resize(+req.query.width, +req.query.height)
          .toFormat('jpeg')
          .toFile(imageThumbPath);
      } catch (err) {
        const errMsg = `<p>image processing failed! ${err}</p>`;
        if (errMsg.includes('missing')) {
          res.status(404).send(`${errMsg} ${filenameErrMessgae}`);
        } else {
          res.status(404).send(`image processing failed! ${err}`);
        }
      }
    } finally {
      res.sendFile(imageThumbPath);
    }
  }
  // if image file name & width only
  else if (req.query.filename && req.query.width && !req.query.height) {
    try {
      await fs.access(imageThumbPathWidthOnly);
    } catch (err) {
      try {
        await sharp(imageFullPath)
          .resize(+req.query.width)
          .toFormat('jpeg')
          .toFile(imageThumbPathWidthOnly);
      } catch (err) {
        const errMsg = `<p>image processing failed! ${err}</p>`;
        if (errMsg.includes('missing')) {
          res.status(404).send(`${errMsg} ${filenameErrMessgae}`);
        } else {
          res.status(404).send(`image processing failed! ${err}`);
        }
      }
    } finally {
      res.sendFile(imageThumbPathWidthOnly);
    }
  } else {
    res.send(`images route`);
  }
});

export default images;
