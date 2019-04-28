import UserModel from '../models/User';

const User = {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  createUser: async(req, res) => {
    if (!req.body.email && !req.body.username && !req.body.password && !req.body.phone) {
      return res.status(400).send({'error': 'All fields are required'});
    }
    const result = await UserModel.create(req.body);
    if(result) {
      return res.status(200).send(result);
    } else {
      return res.status(422).send(err);
    }
  },

  /**
   * @param {object} req
   * @param {object} res
   * @returns {array} list of users
   */
  getUsers: async(req, res, next) => {
    const result = await UserModel.findAll();
    if(result) {
      res.status(200).send(result);
    } else {
      res.status(422).send({'error':'error fetching all users'});
    };
  },

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  getSingleUser: async(req, res, next) => {
    const userId = req.body.userId;
    // findbypk = findbyid, but findbyid is deprecated
    const result = await UserModel.findByPk(userId);
    if(result) {
      res.status(200).send(result);
    } else {
      res.status(422).send({'error':'error fetching that user'});
    };
  },

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  updateUser: async(req, res, next) => {
    const { user, userId } = req.body;
    const updateUser = await UserModel.update(user, { where: { id: userId } });
    if(updateUser) {
      const result = UserModel.findByPk(userId);
      if(result) {
        res.status(200).send(result);
      } else {
        res.status(422).send({'error':'error finding updated user'});
      }
    } else {
      res.status(422).send({'error':'error updating that user'});
    }
  },

  /**
   * @param {object} req
   * @param {object} res
   * @returns {array} list of users
   */
  deleteUser: async(req, res, next) => {
    const userId = req.body.userId;
    const deleteUser = await UserModel.destroy({where: { id: userId }});
    if(deleteUser) {
      const result = await UserModel.findAll();
      res.status(200).send(result);
    } else {
      res.status(422).send({'error':'error deleting user'});
    }
  },

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  loginUser: async(req, res, next) => {
    const { username, password } = req.body;
    const loginUser = await UserModel.findOne({ where: { username: username } });
    if(loginUser) {
      const authentication = bcrypt.compareSync(password, loginUser.password);
      if(authentication) {
        res.status(200).send(loginUser);
      } else {
        res.status(422).send({"error":"invalid-password"});
      }
    } else {
      res.status(422).send({"error":"user-not-found"});
    }
  }
}

export default User;