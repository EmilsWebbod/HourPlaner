
import * as express from 'express';
import {FileCtrl} from '../controllers/file.ctrl';
const router = express.Router();

router.post('/exportExcel', (req, res, next) => {
  FileCtrl.exportExcel(req.body, res).then(x => res.send(x));
});

module.exports = router;
