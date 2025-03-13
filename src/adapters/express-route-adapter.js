const { Request, Response } = require('express');
const { Controller, HttpRequest } = require('./protocols');

const adaptRoute = (controller) => {
  return async function (req, res) {
    const httpRequest = {
      body: req.body
    };
    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};

module.exports = adaptRoute;