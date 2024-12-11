// Imports
import express from "express";
import webpack from 'webpack';
import webpackConfig from '../webpack.config.cjs';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import webpackDevMiddleware from 'webpack-dev-middleware';
import bodyParser from 'body-parser';
import lodash from 'lodash';

// Initialize app
const app = express();

// Get host and port
const HOST = process.env.SERVER_HOST || 'localhost';
const PORT = process.env.SERVER_PORT || 8080;

// Allow to read HTML
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log('-------------------------------------');
  console.log(`Request: ${req.method} ${req.url}`);
  return next();
});

// Bind middleware
const compiler = webpack(webpackConfig);
app.use(historyApiFallback({
  verbose: true,
  rewrites: [
    {
      from: /^\/api\/.*$/,
      to: (context) => context.parsedUrl.path
    }
  ]
}));
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler, {}));

// Initialize API router
const ApiRouter = express.Router();

// Console listening to port
app.listen(PORT, HOST, () => {
  console.log(`Server started listening on ${HOST}:${PORT}`);
}); 
