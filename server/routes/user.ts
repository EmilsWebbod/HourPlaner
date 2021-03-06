'use strict';

import * as express from 'express';
import {UserCtrl} from '../controllers/user.ctrl';
const router = express.Router();

router.post('/login', (req, res, next) => {
  UserCtrl.login(req, res, next);
})
.post('/register', (req, res, next) => {
  UserCtrl.register(req.body).then(x => res.json(x));
})
.get('/logout', (req, res, next) => {
  UserCtrl.logout(req).then(x => res.json(x));
})
.get('/users/:branch', (req, res, next) => {
  UserCtrl.getUsers(req.params.branch).then(x => res.json(x));
})
.get('/test', (req, res, next) => {
  UserCtrl.test().then(x => res.json(x));
});

module.exports = router;
