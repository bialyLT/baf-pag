const validarUrl = (url) => {
    const pattern = /^\/images\/casas\/[^\/]+\/.*\.webp$/;
    return pattern.test(url);
};

const imgValidator = () => {
    return images.every(img => validarUrl(img));
};

module.exports = imgValidator;