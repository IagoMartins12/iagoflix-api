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
exports.userService = void 0;
const filterLastEpisodesByCourse_1 = require("../helpers/filterLastEpisodesByCourse");
const models_1 = require("../models");
exports.userService = {
    //Metodo para achar um usuario com base no email 
    findByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield models_1.User.findOne({
            where: {
                email: email
            }
        });
        return user;
    }),
    //Metodo para criar um usuario
    create: (attributes) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield models_1.User.create(attributes);
        return user;
    }),
    update: (id, attributes) => __awaiter(void 0, void 0, void 0, function* () {
        const [affectedRows, updatedUsers] = yield models_1.User.update(attributes, {
            where: { id },
            returning: true
        });
        return updatedUsers[0];
    }),
    //Metodo para atualizar a senha 
    updatePassword: (id, password) => __awaiter(void 0, void 0, void 0, function* () {
        const [affectedRows, updatedUsers] = yield models_1.User.update({ password }, { where: { id },
            returning: true,
            individualHooks: true //Usado para rodar o hook feito no model 
        });
        return updatedUsers[0];
    }),
    //Metodo para verificar se o usuario possui um episodio que não foi concluido
    getKeepWatchingList: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const userWithWatchingEpisodes = yield models_1.User.findByPk(id, {
            include: {
                association: 'Episodes',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    'order',
                    ['video_url', 'videoUrl'],
                    ['seconds_long', 'secondsLong'],
                    ['course_id', 'courseId']
                ],
                include: [{
                        association: 'Course',
                        attributes: [
                            'id',
                            'name',
                            'synopsis',
                            ['thumbnail_url', 'thumbnailUrl']
                        ],
                        as: 'course'
                    }],
                through: {
                    as: 'watchTime',
                    attributes: [
                        'seconds',
                        ['updated_at', 'updatedAt']
                    ]
                }
            }
        });
        if (!userWithWatchingEpisodes)
            throw new Error('Usuário não encontrado.');
        const keepWatchingList = (0, filterLastEpisodesByCourse_1.filterLastEpisodesByCourse)(userWithWatchingEpisodes.Episodes);
        // @ts-ignore
        keepWatchingList.sort((a, b) => a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1);
        return keepWatchingList;
    }),
};
