
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
    console.log('1');
    Branch.findOne({code: data.branch}).then(branch => {
      console.log('1');
      if (!branch) { return res(Handler.input('No branch with code ' + data.branch)); }

      User.register(User.initUser(data, branch._id), data.password, (err, user) => {
        console.log('1');
        if (err || !user) { return Handler.ctrlError(res)(MSG.W_user_exist)(err); }

        branch.users.push(user._id);
        Branch.update(branch.code, branch).then(x => {
          return res(Handler.success('User registered', user));
        }, x => res(Handler.warning('User added. But failed to save to branch')))
      });
    }, Handler.ctrlError(res)('Failed to look up Branch'));
  }); }

  export function logout(req) { return new Promise(res => {
    req.logout();
    res(Handler.success('User logged out'));
  }); }

  export function getUsers(branch: string) { return new Promise(res => {
    if (branch === '') { return res(Handler.input('Need branch to collect users')); }
    Branch.findOne({code: branch}).exec().then(_branch => {
      if (!_branch) { return res(Handler.input('No branch with code ' + branch)); }
      User.getUsers(_branch._id).then(users => {
        res(Handler.success(`Users from ${branch}`, users));
      }, Handler.ctrlError(res)('Failed to get Users'));
    }, Handler.ctrlError(res)('Failed to get Branch'))
  }); }

  export function test() { return new Promise(res => {
    User.test().then(test => {
      res(Handler.success());
    }, Handler.ctrlModelError(res));
  }); }
}
