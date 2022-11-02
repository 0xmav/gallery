import React, { useState } from "react";
import CollectionElement from "./CollectionElement";
import artBlocksCollections from "../collections";

function CollectionGrid() {
    let elementQuantity = 6;
    const [next, setNext] = useState(elementQuantity);

    function handleClick() {
        setNext(next + elementQuantity);
    }

    return (
        <>
            <section className="collections-grid">
                {artBlocksCollections.slice(0, next).map((collection, index) => {
                    const projectID = artBlocksCollections[index].project_id;
                    return <CollectionElement key={projectID} projectID={projectID} />;
                })}
            </section>
            {next < artBlocksCollections.length ? (
                <button className="button button-secondary" onClick={handleClick}>
                    Load more{" "}
                </button>
            ) : null}
        </>
    );
}

export default CollectionGrid;
