import React, { useState, useContext } from "react";
import artBlocksCollections from "../collections";
import CollectionPiece from "./CollectionPiece";
import Header from "./Header"
import FavouritesContext from "../store/favourite-context";

function FavouritesPage() {

    const favouritesCtx = useContext(FavouritesContext).favourites;

    console.log(favouritesCtx.projectID);
    console.log(favouritesCtx.tokenID);

    let elementQuantity = favouritesCtx.length;
    
    const [next, setNext] = useState(elementQuantity);

    function handleClick() {
        setNext(next + elementQuantity);
    }

    const totalElements = Array.from({ length: next }, (_, index) => {
        return <CollectionPiece key={index} projectID={favouritesCtx[index].projectID} tokenID={favouritesCtx[index].tokenID} />;
    });


    return (
        <>
            <Header title="My Favs" subtitle="My fav collection" />

            <section className="collections-grid">{totalElements}</section>
            {next < artBlocksCollections.length && (
                <button className="button button-secondary" onClick={handleClick}>
                    Load more{" "}
                </button>
            )}
        </>
    );
}

export default FavouritesPage;
