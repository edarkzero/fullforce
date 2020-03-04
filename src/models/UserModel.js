const Model = require("./Model");

class UserModel extends Model {
  constructor() {
    super();
    this.collection = "user";
    this.buildSchema();
    this.model = this.mongoose.model(this.collection, this.schema);
  }

  buildSchema() {
    this.schema = new this.mongoose.Schema({
      name: {
        type: String,
        required: [true, "The name is required"],
        min: [2, "Name too short"]
      },
      username: {
        type: String,
        required: [true, "The username is required"],
        index: true
      },
      email: {
        type: String,
        required: [true, "The e-mail is required"],
        validate: {
          validator: function(v) {
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
          },
          message: props => `${props.value} is not a valid e-mail!`
        },
        index: true
      },
      user_group: {
        type: String,
        enum: ["registered", "admin"],
        required: [true, "The group is required"]
      },
      created_at: { type: Date, default: Date.now },
      last_visit: { type: Date, default: Date.now },
      enabled: {
        type: Boolean,
        default: true
      },
      activated: {
        type: Boolean,
        default: true
      }
    });
    this.schema.index({ email: 1, username: 1 }, { unique: true });
    this.schema.virtual("id").get(function() {
      return this._id.toHexString();
    });
    this.schema.set("toJSON", {
      virtuals: true
    });
  }

  index(query, sort, page, per_page) {
    let queryJson = null;
    try {
      queryJson = JSON.parse(query);
    } catch (e) {
      queryJson = {};
    }
    let sortJson = null;
    try {
      sortJson = JSON.parse(sort);
    } catch (e) {
      sortJson = {};
    }
    let _page = 0;
    if (typeof page !== "undefined") {
      _page = page - 1;
    } else {
      _page = 0;
    }
    let _per_page = 0;
    if (typeof per_page !== "undefined") {
      _per_page = per_page;
    } else {
      _per_page = 0;
    }
    return new Promise((resolve, reject) => {
      this.model
        .find(queryJson, async (err, result) => {
          if (err) {
            global.logger.debug("UserModel:index:error", err);
            reject({ err: err, status: false });
          } else {
            global.logger.debug("UserModel:index:success", result);
            resolve({
              result: {
                total: await this.total(queryJson),
                page: page,
                per_page: _per_page,
                rows: result
              },
              status: true
            });
          }
        })
        .sort(sortJson)
        .skip(Math.floor(parseInt(_page) * parseInt(_per_page)))
        .limit(parseInt(_per_page));
    });
  }

  create(data) {
    return new Promise((resolve, reject) => {
      this.model.create(data, (err, result) => {
        if (err) {
          global.logger.debug("UserModel:create:error", err);
          reject({ err: err, status: false });
        } else {
          global.logger.debug("UserModel:create:success", result);
          resolve({ result: result, status: true });
        }
      });
    });
  }

  update(id, data) {
    return new Promise((resolve, reject) => {
      this.model.update({ _id: id }, data, (err, result) => {
        if (err) {
          global.logger.debug("UserModel:update:error", err);
          reject({ err: err, status: false });
        } else {
          global.logger.debug("UserModel:update:success", result);
          resolve({
            result: {
              nModified: result.nModified,
              operationTime: result.operationTime
            },
            status: true
          });
        }
      });
    });
  }

  show(id) {
    return new Promise((resolve, reject) => {
      this.model.findById(id, (err, result) => {
        if (err) {
          global.logger.debug("UserModel:show:error", err);
          reject({ err: err, status: false });
        } else {
          global.logger.debug("UserModel:show:success", result);
          resolve({
            result: result,
            status: true
          });
        }
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.model.deleteMany({ _id: { $in: id } }, (err, result) => {
        if (err) {
          global.logger.debug("UserModel:delete:error", err);
          reject({ err: err, status: false });
        } else {
          global.logger.debug("UserModel:delete:success", result);
          resolve({
            result: {
              deletedCount: result.deletedCount,
              operationTime: result.operationTime
            },
            status: true
          });
        }
      });
    });
  }

  total(queryJson) {
    return new Promise((resolve, reject) => {
      this.model.countDocuments(queryJson, (err, result) => {
        if (err) {
          global.logger.debug("UserModel:count:error", err);
          reject(0);
        } else {
          global.logger.debug("UserModel:count:success", result);
          resolve(result);
        }
      });
    });
  }
}

module.exports = new UserModel();
