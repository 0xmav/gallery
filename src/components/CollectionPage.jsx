import React, { useState } from "react";
import artBlocksCollections from "../collections";
import CollectionPiece from "./CollectionPiece";
import { useParams } from "react-router-dom";
import Header from "./Header"

function CollectionPage() {
    
    const [title, setTitle] = useState(" ");
    const [subtitle, setSubtitle] = useState(" ");

    const projectID = parseInt(useParams().project_id);

    let elementQuantity = 6;

    const [next, setNext] = useState(elementQuantity);

    function handleClick() {
        setNext(next + elementQuantity);
    }

    const totalElements = Array.from({ length: next }, (_, index) => {
        return <CollectionPiece key={index} projectID={projectID} tokenID={index} setTitle={setTitle} setSubtitle={setSubtitle} />;
    });

    return (
        <>
            <Header title={title} subtitle={subtitle} />

            <section className="collections-grid">{totalElements}</section>
            {next < artBlocksCollections.length && (
                <button className="button button-secondary" onClick={handleClick}>
                    Load more{" "}
                </button>
            )}
        </>
    );
}

export default CollectionPage;
