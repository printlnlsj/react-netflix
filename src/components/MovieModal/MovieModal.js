import React, {useRef} from 'react';
import "./MovieModal.css";
import UseOnClickOutside from "../../hooks/useOnClickOutside";

const MovieModal = ({
                    setIsModalOpen,
                    backdrop_path,
                    title,
                    overview,
                    name,
                    release_date,
                    first_air_date,
                    vote_average
}) => {
    const ref = useRef();
    // ref.current를 잡고 있기 때문에 두 번째 인자에 함수를 넣어서 모달 안/바깥 클릭을 하는지 확인
    UseOnClickOutside(ref, () => {setIsModalOpen(false)});

    return (
        <div className="presentation" role="presentation">
            <div className="wrapper-modal">
                <div className="modal" ref={ref}>
                    <span
                        onClick={() => setIsModalOpen(false)}
                        className="modal-close"
                    >X</span>
                    <img
                        className="modal__poster-img"
                        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                        alt="modal__poster-img"
                    />
                    <div className="modal__content">
                        <p className="modal__details">
                            <span className="modal__user-perc">
                                100% for you
                            </span>{" "}
                            {release_date ? release_date : first_air_date}
                        </p>
                        <h2 className="modal__title">{title ? title : name}</h2>
                        <p className="modal__overview">평점 : {vote_average.toFixed(1)}</p>
                        <p className="modal__overview">{overview}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;