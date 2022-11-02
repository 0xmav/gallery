import React, { useState, useEffect } from "react";
import { artblocksFetchToken } from "../artblocksFetch";
import { LazyLoadImage } from "react-lazy-load-image-component";

function CollectionPiece(props) {
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
            const fetchedData = await artblocksFetchToken(props.projectID, props.tokenID);

            setData(function () {
                return {
                    projectID: props.rojectID,
                    tokenID: props.tokenID,
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
    }, []);

    const [isClicked, setClicked] = useState(false);
    const [clickedImg, setClickedImg] = useState(null);

    props.setTitle(data.collection_name.split("by").shift());
    props.setSubtitle(data.collection_name.split("by").pop());

    function fullScreen() {
        setClickedImg(data.image);
        setClicked(!isClicked);
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
            <div onClick={fullScreen} className="token-img">
                <LazyLoadImage tokenID={data.tokenID} placeholderSrc={data.placeholder} src={data.image} alt={data.alt} effect="blur" />
            </div>

            {isClicked && <Modal clickedImg={clickedImg} setClickedImg={setClickedImg} />}

            <div className="token-desc">
                <p className="token-name">{data.name}</p>
            </div>
        </div>
    );
}

export default CollectionPiece;
