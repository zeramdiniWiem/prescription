const express = require('express');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const precriptionRoute = require('./prescription.route');

const router = express.Router();

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path:'/prescription',
    route: precriptionRoute
  }
];




/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
