"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteService = void 0;
const models_1 = require("../models");
exports.favoriteService = {
    //Metodo para capturar os cursos favoritos de um usuario
    findByUserId: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const favorites = yield models_1.Favorite.findAll({
            where: {
                userId: userId
            },
            attributes: [['user_id', 'userId']],
            include: {
                association: 'Course',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    ['thumbnail_url', 'thumbnailUrl']
                ]
            }
        });
        return {
            userId,
            courses: favorites.map(favorite => favorite.Course)
        };
    }),
    //Metodo para inserir um curso nos favoritos 
    create: (userId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
        const favorite = models_1.Favorite.create({
            courseId,
            userId
        });
        return favorite;
    }),
    //Metodo para deletar um curso nos favoritos 
    delete: (userId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.Favorite.destroy({
            where: {
                userId: userId,
                courseId: courseId
            }
        });
    }),
    //Metodo para checar se um curso está nos favoritos 
    isFavorite: (userId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
        const favorite = yield models_1.Favorite.findOne({
            where: {
                userId: userId,
                courseId: courseId
            }
        });
        return favorite !== null ? true : false;
    })
};
