
import * as express from 'express';
const router = express.Router();
import {BranchCtrl} from '../controllers/branch.ctrl';

router.post('/add', (req, res, next) => {
  BranchCtrl.add(req.body).then(x => res.json(x));
})
.get('/list', (req, res, next) => {
  BranchCtrl.list().then(x => res.json(x));
})
.get('/get/:code', (req, res, next) => {
  BranchCtrl.get(req.params.code).then(x => res.json(x));
})
.post('/update/:code', (req, res, next) => {
  BranchCtrl.update(req.params.code, req.body).then(x => res.json(x));
});

module.exports = router;
