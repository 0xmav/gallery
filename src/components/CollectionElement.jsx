import React, { useState, useEffect } from "react";
import {artblocksFetchProject} from "../artblocksFetch";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {motion} from "framer-motion"
import { Link } from "react-router-dom";

function CollectionElement(props) {

    const [isLoading, setIsLoading] = useState(true);

    
    const [data, setData] = useState({
        projectID: props.projectID,
        tokenID: props.tokenID,
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

        setIsLoading(true);

        const fetchData = async () => {

            const fetchedData = await artblocksFetchProject(data.projectID);

            setData((prev) => {
                return {
                    ...prev,
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
            setIsLoading(false);


        fetchData();


    }, [data.projectID]);

    if(isLoading) {
        console.log("I'm loading...");
        return(<p>Loading...</p>)
    } else {
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
                    <Link to={data.collectionLink}>
                        <LazyLoadImage key={data.alt} placeholderSrc={data.placeholder} src={data.image} alt={data.alt} effect="blur" />
                    </Link>
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
                        <Link to={data.collectionLink}>explore</Link>
                    </p>
                </div>
        </motion.div>
        );
    }

    
}

export default CollectionElement;
