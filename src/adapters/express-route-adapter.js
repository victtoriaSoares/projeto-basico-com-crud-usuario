const adaptRoute = (controller) => {
  return async function (req, res) {
    const httpRequest = {
      body: req?.body,
      params: req?.params,
      pathParameters: req?.pathParameters,
      queryStringParameters: req?.query,
    };
    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};

module.exports = adaptRoute;