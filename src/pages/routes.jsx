import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./home-page";
import { Movie } from "./movie";






const AppRoutes = () => {
    return(
        <BrowserRouter>            
            <Routes>
                <Route exact path="/" element={<HomePage />}/>
                <Route exact path="/movie/:id" element={<Movie />}/>
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }