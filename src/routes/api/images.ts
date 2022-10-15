import express from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import sharp from 'sharp';

const images = express.Router();

images.get('/', async (req, res) => {
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

  if (!req.query.filename) {
    res.send(`
        <p>please enter a valid image name such as:</P>
        <a href="http://localhost:3000/api/images?filename=santamonica">http://localhost:3000/api/images?filename=santamonica</a>`);
    // if only image file name entered
  } else if (req.query.filename && !req.query.width && !req.query.height) {
    res.sendFile(path.join(imageFullPath), (err) => {
      if (err) {
        res.send(`
                  <p>${err}:</P>
                  <p>please enter a valid image name such as:</P>
                  <a href="http://localhost:3000/api/images?filename=santamonica">http://localhost:3000/api/images?filename=santamonica</a>`);
      }
    });
  }
  // if image file name & width & height entered
  else if (req.query.filename && req.query.width && req.query.height) {
    try {
      await fs.access(imageThumbPath);
    } catch (err) {
      console.log(err);
      try {
        await sharp(imageFullPath)
          .resize(+req.query.width, +req.query.height)
          .toFormat('jpeg')
          .toFile(imageThumbPath);
      } catch (err) {
        res.send(`image processing failed! because: ${err}`);
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
      console.log(err);
      try {
        await sharp(imageFullPath)
          .resize(+req.query.width)
          .toFormat('jpeg')
          .toFile(imageThumbPathWidthOnly);
      } catch (err) {
        res.send(`image processing failed! because: ${err}`);
      }
    } finally {
      res.sendFile(imageThumbPathWidthOnly);
    }
  } else {
    res.send('images route');
  }
});

export default images;
