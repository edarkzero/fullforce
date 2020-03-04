class Controller {
  constructor() {
    this.constants = require("../config/constants");
  }

  handleResponse(res, status, results, err) {
    if (status && (typeof results !== "undefined" || results !== null)) {
      this.successCallback(res, results);
    } else {
      this.failCallback(res, err);
    }
  }

  failCallback(res, err) {
    return res.status(500).send({
      code: this.constants.CodeBadRequest,
      message: typeof err !== "undefined" ? err : "unknown error"
    });
  }

  successCallback(res, results) {
    return res.status(200).json({
      code: this.constants.CodeOK,
      data: results
    });
  }
}

module.exports = Controller;
