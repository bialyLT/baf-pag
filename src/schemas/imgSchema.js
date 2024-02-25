import imgValidator from "../utils/imgValidator";

export default imgSchema = new Schema({
    url: {
        type: String,
        validate: {
            validator: imgValidator,
            message: props => `${props.value} no es una URL válida para una imagen`
        },
    }
});