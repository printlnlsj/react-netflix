import React, {useEffect, useState} from 'react';
import "./Nav.css";
import {useNavigate} from "react-router-dom";

const Nav = () => {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    // 스크롤 시 NavBar 색깔 변경
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 50) {
                setShow(true)
            } else {
                setShow(false);
            }
        })

        return () => {
            window.removeEventListener("scroll", () => {});
        }
    }, []);

    const handleChange = (event) => {
        setSearchValue(event.target.value);
        navigate(`/search?q=${event.target.value}`);
    }

    return (
        <nav className={`nav ${show && "nav__black"}`}>
            <img
                alt="Netflix logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
                className="nav__logo"
                onClick={() => window.location.reload()}
            />
            <input
                type="text"
                placeholder="영화를 검색해주세요."
                value={searchValue}
                onChange={handleChange}
                className="nav__input"
            />
            <img
                alt="User logged"
                src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
                className="nav__avatar"
            />
        </nav>
    );
};

export default Nav;