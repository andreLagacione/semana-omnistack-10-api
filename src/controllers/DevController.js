const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

/*
    um controller tem apenas os seguintes metodos
    index - para listar os dados
    show - para mostrar um unico
    store - para salvar um novo
    update - para atualizar um registro
    destroy - para deletar
*/

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = apiResponse.data;
            const techsArray = parseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });

        }

        return response.json(dev);
    },

    async show(request, response) {
        const dev = await Dev.findById({ _id: request.params.id });
        return response.json(dev);
    },

    async update(request, response) {
        const { name, avatar_url, bio, location, techs, id } = request.body;
        const devInBase = { _id: id };
        const techsArray = parseStringAsArray(techs);
        const newDataDev = {
            $set: {
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            }
        };

        const _responseEvent = await Dev.updateOne(devInBase, newDataDev);
        return response.json(_responseEvent);
    },
};

/**
 * construir os metodos de update e delete
 * atualizar os seguintes dados:
 *  - nome
 *  - avatar
 *  - bio
 *  - localização
 *  - techs
 * 
 * E deletar
 */