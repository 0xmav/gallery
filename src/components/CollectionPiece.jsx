import React, { useState, useEffect, useContext } from "react";
import { artblocksFetchToken } from "../artblocksFetch";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FavouritesContext from "../store/favourite-context";

function CollectionPiece(props) {
    const favoritesCtx = useContext(FavouritesContext);

    const itemIsFavourite = favoritesCtx.itemIsFavourite(props.tokenID);

    const [data, setData] = useState({
        projectID: props.projectID,
        tokenID: props.tokenID,
        name: "",
        collection_name: "",
        image: "",
        artist: "",
        description: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await artblocksFetchToken(data.projectID, data.tokenID);

            setData((prev) => {
                return {
                    ...prev,
                    name: fetchedData.name,
                    collection_name: fetchedData.collection_name,
                    image: "https://media.artblocks.io/hd/" + +fetchedData.tokenID + ".png", // Workaround for Squiggles -> bad image metadata
                    artist: fetchedData.artist,
                    description: fetchedData.description,
                    placeholder: "https://res.cloudinary.com/art-blocks/image/fetch/f_auto,c_limit,w_10,q_auto/https://artblocks-mainnet.s3.amazonaws.com/" + +fetchedData.tokenID + ".png",
                };
            });
        };

        fetchData();
    }, [data.projectID, data.tokenID]);

    const [isClicked, setClicked] = useState(false);
    const [clickedImg, setClickedImg] = useState(null);

    if(props.setTitle) {
        props.setTitle(data.collection_name.split("by").shift());
        props.setSubtitle(data.collection_name.split("by").pop());
    }


    function fullScreen() {
        setClickedImg(data.image);
        setClicked(!isClicked);
    }

    function toggleFavourite() {
        if (itemIsFavourite) {
            favoritesCtx.removeFavourite({ projectID: props.projectID, tokenID: props.tokenID });
        } else {
            favoritesCtx.addFavourite({ projectID: props.projectID, tokenID: props.tokenID });
            console.log(favoritesCtx);
        }
    }

    const Modal = ({ clickedImg, setClickedImg }) => {
        const handleClick = (e) => {
            if (e.target.classList.contains("dismiss")) {
                setClickedImg(null);
                setClicked(!isClicked);
            }
        };

        return (
            <>
                <div className="overlay dismiss" onClick={handleClick}>
                    <img src={clickedImg} alt={data.tokenID} />
                    <span className="dismiss" onClick={handleClick}>
                        x
                    </span>
                </div>
            </>
        );
    };

    return (
        <div className="token-element">
            <div className="token-img">
                <div className="favourite">
                    <svg xmlns="http://www.w3.org/2000/svg" className={itemIsFavourite ? "bi bi-heart-fill fav-icon favourited-icon" : "bi bi-heart fav-icon"} onClick={toggleFavourite}>
                        {itemIsFavourite ? (
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        ) : (
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        )}
                    </svg>
                </div>
                <LazyLoadImage tokenID={data.tokenID} placeholderSrc={data.placeholder} src={data.image} alt={data.alt} effect="blur" onClick={fullScreen} />
            </div>

            {isClicked && <Modal clickedImg={clickedImg} setClickedImg={setClickedImg} />}

            <div className="token-desc">
                <p className="token-name">{data.name}</p>
            </div>
        </div>
    );
}

export default CollectionPiece;
