"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("./controllers/authController");
const categorieController_1 = require("./controllers/categorieController");
const coursesController_1 = require("./controllers/coursesController");
const episodesController_1 = require("./controllers/episodesController");
const favoriteController_1 = require("./controllers/favoriteController");
const likeController_1 = require("./controllers/likeController");
const userController_1 = require("./controllers/userController");
const auth_1 = require("./middlewares/auth");
const router = express_1.default.Router();
exports.router = router;
router.get('/', (req, res) => {
    return res.json("hello word");
});
//auth endpoints
router.post('/auth/register', authController_1.authController.register);
router.post('/auth/login', authController_1.authController.login);
//categories endpoints
router.get('/categories', auth_1.ensureAuth, categorieController_1.categoriesController.index);
router.get('/categories/:id', auth_1.ensureAuth, categorieController_1.categoriesController.show);
//courses endpoints
router.get('/courses/featured', auth_1.ensureAuth, coursesController_1.coursesController.featured);
router.get('/courses/newest', coursesController_1.coursesController.newest);
router.get('/courses/search', auth_1.ensureAuth, coursesController_1.coursesController.search);
router.get('/courses/popular', auth_1.ensureAuth, coursesController_1.coursesController.popular);
router.get('/courses/:id', auth_1.ensureAuth, coursesController_1.coursesController.show);
//episodes endpoints 
router.get('/episodes/stream', auth_1.ensureAuthViaQuery, episodesController_1.episodesController.stream);
router.get('/episodes/:id/watchTime', auth_1.ensureAuth, episodesController_1.episodesController.getWatchTime);
router.post('/episodes/:id/watchTime', auth_1.ensureAuth, episodesController_1.episodesController.setWatchTime);
//favorites endpoints 
router.get('/favorites', auth_1.ensureAuth, favoriteController_1.favoriteController.index);
router.post('/favorites', auth_1.ensureAuth, favoriteController_1.favoriteController.save);
router.delete('/favorites/:id', auth_1.ensureAuth, favoriteController_1.favoriteController.delete);
//like endpoints
router.post('/likes', auth_1.ensureAuth, likeController_1.likesController.save);
router.delete('/likes/:id', auth_1.ensureAuth, likeController_1.likesController.delete);
//users endpoints
router.get('/users/current/watching', auth_1.ensureAuth, userController_1.usersController.watching);
router.put('/users/current', auth_1.ensureAuth, userController_1.usersController.update);
router.put('/users/current/password', auth_1.ensureAuth, userController_1.usersController.updatePassword);
router.get('/users/current', auth_1.ensureAuth, userController_1.usersController.show);
