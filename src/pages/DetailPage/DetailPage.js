import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../api/axios";

const DetailPage = () => {
    let {movieId} = useParams();
    console.log('movieId = ', movieId);
    const [movieDetailInfo, setMovieDetailInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`);

            setMovieDetailInfo(request.data);
        }

        fetchData();
    }, [movieId]);

    if(!movieDetailInfo) {
        return <div>...loading</div>
    }
    return (
        <section>
            <img
                className="modal__poster-img"
                src={`https://image.tmdb.org/t/p/original/${movieDetailInfo.backdrop_path}`}
                alt="modal__poster-img"
            />
        </section>
    );
};

export default DetailPage;