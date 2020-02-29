module.exports = (arrayAsString) => {
    if (arrayAsString && arrayAsString.lenght) {
        return arrayAsString.split(',').map(tech => tech.trim());
    }

    return [];
}