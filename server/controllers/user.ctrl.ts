
import {Handler, Logger, MSG} from '../utils/handler';
import {IUserModel, User} from '../models/user.model';
import {Branch} from '../models/branch.model';

const passport = require('passport');

export namespace UserCtrl {

  function setCookie(req) {
    const _extend = 30 * 24 * 60 * 60 * 1000;
    req.session.cookie.expires = new Date(Date.now() + _extend);
    req.session.cookie.maxAge = _extend;
    req.session.regenerate(() => {});
  }

  export function login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err || !user) { return res.json(Handler.warning(MSG.W_login)); }
      req.login(user, login_error => {
        if (login_error) { return res.json(Handler.warning(MSG.W_login)); }
        if (req.body.remember) { setCookie(req); }
        return res.json(Handler.success('User logged in'));
      });
    })(req, res, next);
  }

  export function register(data) { return new Promise(res => {
    if (!data.username && !data.branch) { return res(Handler.input(MSG.I_default)); }
    if (!data.password) { data.password = data.username; }
    Branch.findOne({name: data.branch}).then(branch => {
      if (!branch) { return res(Handler.input('No branch with name' + data.branch)); }
      User.register(User.initUser(data, branch._id), data.password, (err, user) => {
        if (err || !user) { return Handler.ctrlError(res)(MSG.W_user_exist)(err); }
        return res(Handler.success('User registered'));
      });
    }, Handler.ctrlError(res)('Failed to look up Branch'));
  }); }

  export function logout(req) { return new Promise(res => {
    req.logout();
    res(Handler.success('User logged out'));
  }); }

  export function getUsers(branch: string) { return new Promise(res => {
    if (branch === '') { return res(Handler.input('Need branch to collect users')); }
    Branch.findOne({name: branch}).exec().then(_branch => {
      User.getUsers(_branch._id).then(users => {
        res(Handler.success(`Users from ${branch}`, users));
      }, Handler.ctrlError(res)('Failed to get Users'));
    })
  }); }

  export function test() { return new Promise(res => {
    User.test().then(test => {
      res(Handler.success());
    }, Handler.ctrlModelError(res));
  }); }
}
