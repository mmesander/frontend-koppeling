// Styling
import './MovieCard.css';

// Assets
import favorite from '../../assets/icons/heart-straight-fill.svg';
import watchlist from '../../assets/icons/eye-fill.svg';
import watched from '../../assets/icons/check-fat-fill.svg';

// Functions
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function MovieCard({title, image, rating, id}) {
    const navigate = useNavigate();
    const roundedRating = Math.round(rating * 10) / 10;
    const [details, setDetails] = useState();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    };
    const [listItem, setListItem] = useState({
        favorite: false,
        watchlist: false,
        watched: false
    })

    async function fetchMovieDetails() {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=nl-NL`, options)
            setDetails(response.data);
            console.log(details);
        } catch (e) {
            console.error(e)
        }
    }

    function clickHandler() {
        void fetchMovieDetails(id)

        if (details) {
            navigate(`/details/${id}`)
        }
    }

    return (
        <button
            type="radio"
            className="details-button"
            onClick={clickHandler}
        >
            <div className="moviecard-container">
                <section className="moviecard-header-section">
                    <img src={`https://image.tmdb.org/t/p/w500${image}`} alt={title}/>
                    <h3>{title}</h3>
                    <h4>Rating: {roundedRating}</h4>
                </section>
                <div className="icons-container">
                    <button
                        type="button"
                        className={listItem.favorite ? "active-favorite-icon" : "default-icon"}
                        onClick={() => setListItem({
                            ...listItem,
                            favorite: !favorite
                        })}
                    >
                        <img src={favorite} alt="favorite-icon"/>
                    </button>
                    <button
                        type="button"
                        className={listItem.watchlist ? "active-watchlist-icon" : "default-icon"}
                        onClick={() => setListItem({
                            ...listItem,
                            watchlist: !watchlist
                        })}
                    >
                        <img src={watchlist} alt="watchlist-icon"/>
                    </button>
                    <button
                        type="button"
                        className={listItem.watched ? "active-watched-icon" : "default-icon"}
                        onClick={() => setListItem({
                            ...listItem,
                            watched: !watched
                        })}
                    >
                        <img src={watched} alt="watched-icon"/>
                    </button>
                </div>
            </div>
        </button>
    )
}

export default MovieCard;