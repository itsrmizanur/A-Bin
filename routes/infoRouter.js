const express = require('express');
const { Info } = require('../models/info');
const router = express.Router();

const newInfo = async (req, res) => {
    //Get Values
    const { main_text, lang, pass } = req.body;

    //const info = new Info(req.body);
    try {
        //store filtered info in DB
        const data = await Info.create({
          main_text,
          lang,
          pass,
        });
        //const result = await info.save(data);
        res.send(data._id);
    }
    catch (err) {
        const errMsgs = [];
        for (field in err.errors) {
            errMsgs.push(err.errors[field].message);
        }
        return res.status(400).send(errMsgs);
    }
};

const showInfo = async (req, res) => {
    const id = req.params.id;
    console.log(req.query);
    try {
        const data = await Info.findOne({ _id: id }).select('main_text lang pass');
        if ((data.pass && data.pass == req.query.pass) || (data.pass== null)) {
          res.send({ main_text: data.main_text, lang: data.lang });
        } else {
          res.send("Password bhul hoiche vai");
        }
    } catch (err) {
      const errMsgs = [];
      for (field in err.errors) {
        errMsgs.push(err.errors[field].message);
      }
      return res.status(400).send(errMsgs);
    }
}


router.route('/').post(newInfo);
router.route('/:id').get(showInfo);

module.exports = router;