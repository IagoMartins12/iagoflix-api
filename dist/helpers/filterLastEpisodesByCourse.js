"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterLastEpisodesByCourse = void 0;
//Função para filtrar os episodios que não foram concluido por curso. A função irá retornar o episodio mais recente
function filterLastEpisodesByCourse(episodes) {
    const coursesOnList = [];
    const lastEpisodes = episodes.reduce((currentList, episode) => {
        if (!coursesOnList.includes(episode.courseId)) {
            coursesOnList.push(episode.courseId);
            currentList.push(episode);
            return currentList;
        }
        const episodeFromSameCourse = currentList.find(ep => ep.courseId === episode.courseId);
        if (episodeFromSameCourse.order > episode.order)
            return currentList;
        const listWithoutEpisodeFromSameCourse = currentList.filter(ep => ep.courseId !== episode.courseId);
        listWithoutEpisodeFromSameCourse.push(episode);
        return listWithoutEpisodeFromSameCourse;
    }, []);
    return lastEpisodes;
}
exports.filterLastEpisodesByCourse = filterLastEpisodesByCourse;
