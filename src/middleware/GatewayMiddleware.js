class GatewayMiddleware {
  constructor(gateway_key) {
    this.gateway_key = gateway_key;
  }
  handler(req, res, next) {
    if (this.gateway_key === req.headers["micro-gateway-auth-x"]) {
      next();
    } else {
      res.status(405).json({
        code: "UNAUTHORIZATED",
        message: "You don't have access to enter"
      });
    }
  }
}

module.exports = GatewayMiddleware;
