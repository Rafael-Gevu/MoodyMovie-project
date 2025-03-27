import axios from "axios"
const apiKey = "886b037c9beb593d291fef5167498e1f"







async function getMoviesByGenre(selectedMood, language, page){
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?&api_key=${apiKey}&with_genres=${selectedMood}&language=${language}&page=${page}`)
    return response.data.results
    }

export {getMoviesByGenre}