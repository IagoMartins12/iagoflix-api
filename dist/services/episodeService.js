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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.episodeService = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const models_1 = require("../models");
exports.episodeService = {
    //Metodo para steam dos episodios
    streamEpisodeToResponse: (res, videoUrl, range) => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, "..", "..", "uploads", videoUrl);
        const fileStat = fs_1.default.statSync(filePath);
        if (range) {
            //capturando o inicio e o final da parte especifica do video 
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1;
            const chunkSize = (end - start) + 1;
            const file = fs_1.default.createReadStream(filePath, {
                start: start,
                end: end
            });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Lenght': chunkSize,
                'Content-Type': 'video/mp4'
            };
            res.writeHead(206, head);
            file.pipe(res);
        }
        else {
            const head = {
                'Content-Lenght': fileStat.size,
                'Content-Type': 'video/mp4'
            };
            res.writeHead(200, head);
            fs_1.default.createReadStream(filePath).pipe(res);
        }
    }),
    //Metodo para recuperar em que momento o episodio parou
    getWatchTime: (userId, episodeId) => __awaiter(void 0, void 0, void 0, function* () {
        const watchTime = yield models_1.WatchTime.findOne({
            attributes: ['seconds'],
            where: {
                userId,
                episodeId
            }
        });
        return watchTime;
    }),
    //Metodo para salvar os segundos do episodio
    setWatchTime: ({ userId, episodeId, seconds }) => __awaiter(void 0, void 0, void 0, function* () {
        const watchTimeAlreadyExists = yield models_1.WatchTime.findOne({
            where: {
                userId,
                episodeId
            }
        });
        if (watchTimeAlreadyExists) {
            watchTimeAlreadyExists.seconds = seconds;
            yield watchTimeAlreadyExists.save();
            return watchTimeAlreadyExists;
        }
        else {
            const watchTime = yield models_1.WatchTime.create({
                userId,
                episodeId,
                seconds
            });
            return watchTime;
        }
    })
};
