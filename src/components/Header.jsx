import React from "react";
import {Link} from "react-router-dom";

function Header({title="ArtBlocks Curated", subtitle="Discovering, tracking and purchasing Art Blocks on the secondary market just got a whole lot better."}) {
    function handleClick(e) {
        e.preventDefault();
        console.log("click");
    }

    return (
        <header>
            <div className="menu">
                <Link className="logo" to="/">gallery</Link>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-dark-mode" viewBox="0 0 16 16">
                    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                </svg>

                <form className="search-bar">
                    <input placeholder="Search..." />
                    <button onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </form>
            </div>

            <div className="title">
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
        </header>
    );
}

export default Header;
