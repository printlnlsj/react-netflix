import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css"
import useDebounce from "../../hooks/UseDebounce";

const SearchPage = () => {
    console.log('useLocation() = ', useLocation());
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    // Search 페이지에서 debouncedSearchTerm 가져오기
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    // const searchTerm = query.get("q"); // 파라미터의 q값을 가져온다.
    const debouncedSearchTerm = useDebounce(query.get("q"), 500);
    console.log('debouncedSearchTerm = ', debouncedSearchTerm);

    // searchTerm이 바뀔 때마다 새로 영화 데이터 가져오기
    useEffect(() => {
        if(debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    const fetchSearchMovie = async (debouncedSearchTerm) => {
        try {
            const request = await axios.get(`/search/multi?include_adult=false&query=${debouncedSearchTerm}`);
            setSearchResults(request.data.results);
        } catch (error) {
            console.log("error = ", error);
        }
    }

    // searchTerm에 해당 영화 데이터가 있을 경우
    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className="search-container">
                {searchResults.map((movie) => {
                    if(movie.backdrop_path !== null && movie.media_type !== "person") {
                        const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;

                        return (
                            <div className="movie" key={movie.id}>
                                <div className="movie__column-poster" onClick={() => navigate(`/${movie.id}`)}>
                                    <img src={movieImageUrl} alt="movie__poster"/>
                                </div>
                            </div>
                        );
                    }
                })}
            </section>
        ) : (
            // searchTerm에 해당 영화 데이터가 없을 경우
            <section className="no-results">
                <div className="no-results__text">
                    <p>Your search for "{debouncedSearchTerm}" did not have any matches.</p>
                    <p>Suggestions</p>
                    <ul>
                        <li>Try different keywords</li>
                    </ul>
                </div>
            </section>
        )
    }

    return renderSearchResults();
};

export default SearchPage;