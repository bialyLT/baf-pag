const mongoose = require('mongoose');
const { Schema } = mongoose;
import imgValidator from "../utils/imgValidator";

const imgSchema = new Schema({
    url: {
        type: String,
        validate: {
            validator: imgValidator,
            message: props => `${props.value} no es una URL válida para una imagen`
        },
    }
});

module.exports = imgSchema;