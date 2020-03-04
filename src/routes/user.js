class UserRoute {
  constructor(router) {
    this.base_url = "users";
    this.bodyParser = require("body-parser");
    this.jsonParser = this.bodyParser.json();
    this.controller = require("./../controllers/UserController");
    this.router = router;
  }

  build() {
    this.router.get(`/${this.base_url}`, (req, res) =>
      this.controller.index(req, res)
    );
    this.router.post(`/${this.base_url}`, this.jsonParser, (req, res) =>
      this.controller.create(req, res)
    );
    this.router.put(`/${this.base_url}/:id`, this.jsonParser, (req, res) =>
      this.controller.update(req, res)
    );
    this.router.get(`/${this.base_url}/:id`, (req, res) =>
      this.controller.show(req, res)
    );
    this.router.delete(`/${this.base_url}`, this.jsonParser, (req, res) =>
      this.controller.delete(req, res)
    );
    return this.router;
  }
}

module.exports = UserRoute;
