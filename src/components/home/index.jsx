import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import { getMoviesByGenre } from "../../services/get-movie-genre"
import { Cards } from "../cards/cards"
import { getPopularMovies } from "../../services/get-popular-movies"
import { Link } from "react-router-dom"
import { useContext } from "react";
import { LanguageContext } from "../../contexts/language-context"

import { LanguageTogglerButton } from "../language-toggler-button/language-toggler-button"
import arrow from "../../images/arrow.png"
import noPoster from "../../images/noPoster.png"
export const Home = () => {
    const [selectedMood, setSelectedMood] = useState('')
    const [page, setPage] = useState(1)
    const [movieList, setMovieList] = useState([])
    const [movieCarousel, setMovieCarousel] = useState([])

    const { language } = useContext(LanguageContext)
    const handleSelect = (e) => {
        setSelectedMood(e.target.value)
    }

    const LoadNextPage = async () => {
        {page <= 9 && setPage(page + 1)}
        fetchList()
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    const ReturnToPrevPage = async () => {
        {page > 1 && setPage(page - 1)}
        fetchList()
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        fetchList()

    }, [selectedMood, language, page])

    async function fetchList() {
        const list = await getMoviesByGenre(selectedMood, language, page);
        const filteredList = list.filter(({ adult, original_language }) => { return adult === false });
        setMovieList(filteredList);
        const popularMoviesList = await getPopularMovies(language);
        const carouselList = popularMoviesList.filter(({ popularity, poster_path, genre_ids }) => { return popularity > 10.000 && poster_path !== null && genre_ids.length !== 0 });
        setMovieCarousel(carouselList);
    }

    return (

        <Main>
            <Nav>
                <Link to={'/'}><Logo>MoodyMovie</Logo></Link>
                <Div>

                    {language === 'en-US' &&
                        <Question>How you're feeling today?</Question>
                    }

                    {language === 'pt-BR' &&
                        <Question>Como você está se sentindo?</Question>
                    }

                    {language === 'en-US' &&
                        <Select
                            onChange={handleSelect}>
                            <option value="">Select a mood</option>
                            <option value="35">Happy 😁</option>
                            <option value="18">Sad 😔</option>
                            {/* <option value="10749">In love 😍</option> */}
                            <option value="27">Scared 😨</option>
                            <option value="12">Excited 🤩</option>
                            <option value="99">thoughtful 🤔</option>
                        </Select>
                    }

                    {language === 'pt-BR' &&
                        <SelectPT
                            onChange={handleSelect}>
                            <option value="">escolha seu humor</option>
                            <option value="35">Feliz 😁</option>
                            <option value="18">Triste 😔</option>
                            {/* <option value="10749">Apaixonado(a) 😍</option> */}
                            <option value="27">Assustado(a) 😨</option>
                            <option value="12">Animado(a) 🤩</option>
                            <option value="99">Reflexivo(a) 🤔</option>
                        </SelectPT>
                    }

                </Div>

                <LanguageTogglerButton />
            </Nav>

            {selectedMood === "" &&
                <CarouselContainer>
                    <CarouselTrack>
                        {movieCarousel.map((movie, index) => {
                            return (
                                <Carousel key={index}>
                                    <Link to={`/movie/${movie.id}`}>

                                        {movie.poster_path != null &&
                                            <CarouselImg src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} alt="movie-poster" />
                                        }

                                        {movie.poster_path === null &&
                                            <CarouselImg src={noPoster} alt="no-movie-poster" />
                                        }

                                        <div>{movie.genre_ids[0] === 16 && <Emoji>😁</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 35 && <Emoji>😁</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 10751 && <Emoji>😁</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 18 && <Emoji>😔</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 10752 && <Emoji>😔</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 10749 && <Emoji>😍</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 27 && <Emoji>😨</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 53 && <Emoji>😨</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 12 && <Emoji>🤩</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 28 && <Emoji>🤩</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 14 && <Emoji>🤩</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 10402 && <Emoji>🤩</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 99 && <Emoji>🤔</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 9648 && <Emoji>🤔</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 36 && <Emoji>🤔</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 878 && <Emoji>🤔</Emoji>}</div>

                                    </Link>
                                </Carousel>
                            )
                        })}
                    </CarouselTrack>
                </CarouselContainer>
            }

            {selectedMood != "" &&
                <>
                    <Section>

                        {movieList.map((movie, index) => {
                            return (
                                <div key={index}>
                                    <Link to={`/movie/${movie.id}`}>
                                        <Cards>
                                            {movie.poster_path != null &&
                                                <Img src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} alt="movie-poster"></Img>
                                            }

                                            {movie.poster_path === null &&
                                                <Img src={noPoster} alt="no-movie-poster"></Img>
                                            }
                                            <HiddenSection>
                                                <Title>{movie.title}</Title>
                                                <Description>{movie.overview}</Description>
                                            </HiddenSection>
                                        </Cards>
                                    </Link>
                                </div>
                            )
                        })}

                    </Section>

                    <ChangePage>
                        <Button onClick={() => ReturnToPrevPage()}><LeftArrow src={arrow} /></Button>
                        <PageNumber>{page}</PageNumber>
                        <Button onClick={() => LoadNextPage()}><RightArrow src={arrow} /></Button>
                    </ChangePage>
                </>
            }
        </Main>
    )
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    
`

const Logo = styled.h1`
    font-family: 'Raleway', sans-serif;
    @media (max-width: 762px){
        margin-bottom: 20px;
    }
`

const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 3%; 
    @media (max-width: 762px){
        flex-direction: column;
        gap: 20px;
    }
`

const Div = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    @media (max-width: 762px){
        flex-direction: column;
    }
`

const Question = styled.h3`
    font-family: 'Raleway', sans-serif;
`

const Select = styled.select`
    font-family: 'Raleway', sans-serif;
    width: 150px;
    padding: 10px;
    border-radius: 10px;
    background-color: transparent;
    border-none;
    color: #fff;
    cursor: pointer;
`

const SelectPT = styled.select`
    font-family: 'Raleway', sans-serif;
    width: 180px;
    padding: 10px;
    border-radius: 10px;
    background-color: transparent;
    border-none;
    color: #fff;
    cursor: pointer;
`

const CarouselContainer = styled.div`
    overflow: hidden;   
`


const sliderAnimation = keyframes`
    from{
        transform: translateX(0%);
    }
    to{
        transform: translateX(-200%);
    }    
`

const CarouselTrack = styled.section`
    display: flex;
    overflow: hidden;
    overflow-x: auto; 
    position absolute;
    padding: 3%;
    width: 100vw;
    gap: 50px;
    margin-bottom: 50px;
    @media (max-width: 762px){
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }
`

const Carousel = styled.div`
    position: relative;
    animation: 20s ${sliderAnimation} linear infinite;
    @media (max-width: 762px){
        animation: none;
    }
`

const CarouselImg = styled.img`
    width: 350px;
    heigth: 450px;
    border-radius: 10px;
    @media (max-width: 762px){
        width: 200px;
        height: 300px;
    }
`

const Emoji = styled.p`
    position: absolute;
    bottom: -30px;
    transform: rotate(20deg);
    right: -20px;
    font-size: 80px;
    @media (max-width: 762px){
        font-size: 50px;
    }
`

const Section = styled.section`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 50px;    
    margin: 40px 0px 40px 0px;
    @media (max-width: 762px){
        grid-template-columns: 1fr ;
    }
`

const Img = styled.img`
    width: 300px;
    height: 400px;
    border-radius: 10px;
    @media (max-width: 762px){
        width: 200px;
        height: 300px;

    }
`

const HiddenSection = styled.div`
    position: absolute;
    bottom: -100px;
    background: linear-gradient( #00000000, #000000 90%);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 10px;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    &:hover{
        opacity: 1;
        bottom: 0px;        
    }
`

const Title = styled.p`
    font-size: 20px;
    font-family: 'Raleway', sans-serif;
    color: #fff;
    
    margin-bottom: 5px;
`

const Description = styled.p`
    font-family: 'Raleway', sans-serif;
    font-size: 13px;
    color: #fff;   
`
const ChangePage = styled.div`
    display:flex;
    align-items: center;
    margin-bottom: 50px;
    gap: 10px;
`

const Button = styled.button`
    width: 30px;
    height: 30px;
    background: transparent;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 30px;
    border: 1px solid #fff;
    cursor: pointer;
    border-radius: 30px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LeftArrow = styled.img`
    width: 10px;
    height: 10px;
    rotate: 180deg;   
`

const RightArrow = styled.img`
    width: 10px;
    height: 10px;
`

const PageNumber = styled.span`
    font-family: 'Raleway', sans-serif;
`