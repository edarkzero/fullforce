const Controller = require("./Controller");

class StatisticController extends Controller {
  constructor() {
    super();
    this.model = require("../models/UserModel");
  }

  async index(req, res) {
    await this.model
      .index(
        req.query.query,
        req.query.sort,
        req.query.page,
        req.query.per_page
      )
      .then(modelResponse => {
        this.handleResponse(res, modelResponse.status, modelResponse.result);
      })
      .catch(err => {
        this.handleResponse(res, err.status, null, err.err);
      });
  }

  async create(req, res) {
    await this.model
      .create(req.body)
      .then(modelResponse => {
        this.handleResponse(res, modelResponse.status, modelResponse.result);
      })
      .catch(err => {
        this.handleResponse(res, err.status, null, err.err);
      });
  }

  async update(req, res) {
    await this.model
      .update(req.params.id, req.body)
      .then(modelResponse => {
        this.handleResponse(res, modelResponse.status, modelResponse.result);
      })
      .catch(err => {
        this.handleResponse(res, err.status, null, err.err);
      });
  }

  async show(req, res) {
    await this.model
      .show(req.params.id)
      .then(modelResponse => {
        this.handleResponse(res, modelResponse.status, modelResponse.result);
      })
      .catch(err => {
        this.handleResponse(res, err.status, null, err.err);
      });
  }

  async delete(req, res) {
    await this.model
      .delete(req.body.ids)
      .then(modelResponse => {
        this.handleResponse(res, modelResponse.status, modelResponse.result);
      })
      .catch(err => {
        this.handleResponse(res, err.status, null, err.err);
      });
  }
}

module.exports = new StatisticController();
