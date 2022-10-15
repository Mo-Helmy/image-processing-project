import express from 'express';
import images from './api/images';
import { getAvailableImagePaths } from './api/images';

const routes = express.Router();

routes.get('/', async (req, res) => {
  const availableImagesArray = await getAvailableImagePaths();
  const availableImageLinks = availableImagesArray.map(
    (image) =>
      `<li>by file name: <a href="/api/images?filename=${image}">/api/images?filename=${image}</a></li>
        <li>by file name and width and height: <a href="/api/images?filename=${image}&width=100&height=100">/api/images?filename=${image}&width=100&height=100</a></li>
        <li>by file name and width only: <a href="/api/images?filename=${image}&width=200">/api/images?filename=${image}&width=200</a></li>`
  );

  res.send(
    `<h1>Welcome to image processing project</h1>
      <p>Listening at <code><a href="/api/images">/api/images</a></code> for queries containing at least a valid filename. Optionally use width and height or width only to set the size...</p>
      <p>Examples:</p>
      <ul>
      ${availableImageLinks.join('')}
      </ul>`
  );
});

routes.use('/images', images);

export default routes;
