import { useState, useEffect } from "react";
import { getMovieInfo } from "../../services/get-movie-info";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import noPoster from "../../images/noPoster.png"
import { LanguageContext } from "../../contexts/language-context"
import { useContext } from "react";


const MovieDetails = () => {
    const [movieInfo, setMovieInfo] = useState([])
    const [movieGenres, setMovieGenres] = useState([])
    const [director, setDirector] = useState([])
    const [cast, setCast] = useState([])
    const [background, setBackground] = useState(null)
    const [poster, setPoster] = useState(null)
    const params = useParams()
    const { language } = useContext(LanguageContext)
    useEffect(() => {
        fetchData()
    }, [])
    async function fetchData() {
        const movieData = await getMovieInfo(params.id, language)
        console.log(movieData)
        const backgroundData = movieData.backdrop_path
        const posterData = movieData.poster_path
        const genresData = movieData.genres
        const directorData = (movieData.credits.crew.filter((person) => { return person.job === "Director" }).map(({ name }) => { return name }))
        const castData = movieData.credits.cast.slice(0, 4)
        setMovieInfo(movieData)
        setBackground(backgroundData)
        setPoster(posterData)
        setMovieGenres(genresData)
        setDirector(directorData)
        setCast(castData)}

    return (
        <Main>
            <>
                <Overlay>
                    <Background src={`https://image.tmdb.org/t/p/original${background}`} alt="background-image" />
                </Overlay>

                <Link to={'/'}><Logo>MoodyMovie</Logo></Link>
            
                <Data>
                    <div>

                        {poster !== null &&
                            <MoviePoster src={`https://image.tmdb.org/t/p/original${poster}`} alt="movie-poster" />
                        }

                        {poster === null &&
                            <MoviePoster src={noPoster} alt="no-movie-poster" />
                        }

                    </div>
                    <InfoSection>

                        <h1>{movieInfo.title}</h1>

                        <GenresSection>

                            {movieGenres.length === 0 && <Genre>No movie genres found</Genre>}

                            {movieGenres.map((genre, index) => {
                                return (
                                    <div key={index}>
                                        <Genre>{genre.name}</Genre>
                                    </div>
                                )
                            })}

                        </GenresSection>

                        {movieInfo.overview === '' && <p>No overview found</p>}

                        <p>{movieInfo.overview}</p>

                        <Credits>

                            <div>
                                <p>Directed by:</p>
                                {director.length === 0 && <p>No director found</p>}                            
                                <div>{director.map((director, index) => {
                                    return (
                                        <div key={index}>
                                            <p>{director}</p>
                                        </div>
                                    )
                                })}</div>
                            </div>

                            <div>
                                <p>Cast:</p>
                                {cast.length === 0 && <p>No cast found</p>}
                                <div>{cast.map((actor, index) => {
                                    return (
                                        <div key={index}>
                                            <p>{actor.name}</p>
                                        </div>
                                    )
                                })}</div>
                            </div>

                        </Credits>
                    </InfoSection>
                </Data >

            </>
        </Main>
    )
}

export { MovieDetails }

const Main = styled.main`
    display: flex;   
    justify-content: center;
    align-items: center;
    height: 100vh;
    @media (max-width: 762px){
        flex-direction: column;
    }
    `

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7)
`

const Background = styled.div`
    background: url(${(props)=>props.src}) center;
    background-size: cover;
    height: 100%;
    width: 100%;
    z-index: -1;
    position: relative;
    } 
`

const Logo = styled.h1`
    font-family: 'Raleway', sans-serif;
    position: absolute;
    color: #fff;
    top: 0;
    left :0;
    padding: 3%;
    @media (max-width: 762px){
        width: 100%;
        text-align: center;
    }
    `

const Data = styled.div`
    position: absolute;
    display: flex;
    color: #fff;
    text-shadow: 1px 1px 1px #000000;
    gap: 100px;
    align-items: center;
    @media (max-width: 762px){
        flex-direction: column;
        top: 100px;
        gap: 10px;
        font-size: 14px;
    }
`

const MoviePoster = styled.img` 
    width: 400px;
    border-radius: 10px;
    @media (max-width: 762px){
        width: 200px;
    }   
`

const InfoSection = styled.section`
    width: 350px;
    display: flex;
    flex-direction: column;
    font-family: 'Raleway', sans-serif;
    @media (max-width: 762px){
        gap: 10px;
        text-align: center;
        
    }
`

const GenresSection = styled.div`
    display: flex;
    gap: 20px;
    margin: 10px 0px 30px 0px;
    @media (max-width: 762px){
        flex-direction: column;
        align-items: center;
    }
    
`

const Genre = styled.p`
    font-size: 15px;
    padding: 10px;

    border-radius: 10px;
    background-color: #1F2122;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border: none;
    @media (max-width: 762px){
        
        
    }
`

const Credits = styled.div`
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 762px){
        font-size: 13px;
        justify-content: space-around;
        margin: 10px 0px 30px 0px;
    }
`