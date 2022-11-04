const { Schema, model } = require('mongoose');

const Info = model('Info', Schema({
    main_text: { type: String, required: true },
    lang: { type: String, required: true },
    pass: { type: String, default: null}
}));

exports.Info = Info;