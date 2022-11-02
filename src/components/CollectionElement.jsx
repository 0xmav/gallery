import React, { useState, useEffect } from "react";
import {artblocksFetchProject} from "../artblocksFetch";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {motion} from "framer-motion"

function CollectionElement(props) {
    const [data, setData] = useState({
        projectID: props.projectID,
        tokenID: null,
        name: "",
        collection_name: "",
        image: "",
        artist: "",
        website: "",
        description: "",
        collectionLink: "",
        placeholder: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await artblocksFetchProject(props.projectID);

            setData(function() {
                return {
                    projectID: props.projectID,
                    tokenID: fetchedData.tokenID,
                    name: fetchedData.name,
                    collection_name: fetchedData.collection_name,
                    image: "https://media.artblocks.io/" + +fetchedData.tokenID + ".png", // Workaround for Squiggles -> bad image metadata
                    artist: fetchedData.artist,
                    website: fetchedData.website,
                    description: fetchedData.description,
                    collectionLink: "/collection/" + data.projectID,
                    placeholder: "https://res.cloudinary.com/art-blocks/image/fetch/f_auto,c_limit,w_10,q_auto/https://artblocks-mainnet.s3.amazonaws.com/" + +fetchedData.tokenID + ".png",
                };
            });


        };

        fetchData();
    }, []);

    return (
        <motion.div
                    className="collection-element"
                    initial="initialState"
                    animate="animateState"
                    exit="exitState"
                    transition={{ duration: 1 }}
                    variants={{ initialState: { opacity: 0 }, animateState: { opacity: 1 }, exitState: {} }}
                >
            <div className="collection-img">
                <a href={data.collectionLink}>
                    <LazyLoadImage key={data.alt} placeholderSrc={data.placeholder} src={data.image} alt={data.alt} effect="blur" />
                </a>
            </div>
            <div className="collection-desc">
                <h3>{data.collection_name.split("by").shift()}</h3>
                <p className="artist-link">
                    by{" "}
                    <a href={data.website} target="_blank" rel="noreferrer noopener">
                        {data.artist}
                    </a>
                </p>
                <p className="collection-explore-link">
                    <a href={data.collectionLink}>explore</a>
                </p>
            </div>
    </motion.div>
    );
}

export default CollectionElement;
