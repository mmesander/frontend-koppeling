// Functions
import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";

// Context
import {ListsContext} from "../../context/ListsContext";

// Helpers
import roundRating from "../../helpers/roundRating";

// Styles
import './MovieCard.css';

// Assets
import favoriteIcon from '../../assets/icons/heart-straight-fill.svg';
import watchlistIcon from '../../assets/icons/eye-fill.svg';
import watchedIcon from '../../assets/icons/check-fat-fill.svg';

function MovieCard({title, image, rating, id}) {
    const navigate = useNavigate();
    const roundedRating = roundRating(rating);

    const {listItem,} = useContext(ListsContext);

    function clickHandler() {
        if (id) {
            navigate(`/details/${id}`);
        }
    }

    return (
        <button
            type="radio"
            className="moviecard-container-button"
            onClick={clickHandler}
        >
            <div className="moviecard-container">
                <section className="moviecard-header-section">
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w500${image}`} alt={title}/>
                        {title.length < 40 && <h3>{title}</h3>}
                        {title.length > 40 && !title.length < 40 && <h4>{title}</h4>}
                    </div>
                    <div>
                        <h4>Rating: {roundedRating}</h4>
                    </div>
                </section>
                <section className="icons-container">
                    <div className={listItem.favorite ? "active-favorite-icon" : "default-icon"}>
                        <img src={favoriteIcon} alt="favorite-icon"/>
                    </div>
                    <div className={listItem.watchlist ? "active-watchlist-icon" : "default-icon"}>
                        <img src={watchlistIcon} alt="watchlist-icon"/>
                    </div>
                    <div className={listItem.watched ? "active-watched-icon" : "default-icon"}>
                        <img src={watchedIcon} alt="watched-icon"/>
                    </div>
                </section>
            </div>
        </button>
    )
}

export default MovieCard;