"use strict";
// configurando o adminJs. Resource para a tabela categoria
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryResourceOptions = void 0;
exports.categoryResourceOptions = {
    navigation: 'Catálogo',
    editProperties: ['name', 'position'],
    filterProperties: ['name', 'position', 'createdAt', 'updatedAt'],
    listProperties: ['id', 'name', 'position'],
    showProperties: ['id', 'name', 'position', 'createdAt', 'updatedAt']
};
