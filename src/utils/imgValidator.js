const validarUrl = (url) => {
    const pattern = /^\/images\/casas\/[^\/]+\/.*\.webp$/;
    return pattern.test(url);
};

export default imgValidator = () => {
    return images.every(img => validarUrl(img));
};
