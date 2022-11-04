import { createContext, useState } from "react";

const FavouritesContext = createContext({
    favourites: [],
    totalFavourites: 0,
    addFavouriteHandler: (favouritePiece) => {},
    removeFavouriteHandler: (unfavouritePiece) => {},
    itemIsFavouriteHandler: (isFavouritePiece) => {},
});

export function FavouritesContextPrvider(props) {
    const [userFavourites, setUserFavourites] = useState([]);

    // Adding a piece to Favourites
    function addFavouriteHandler(favouritePiece) {
        setUserFavourites((prevUserFavourites) => {
            return prevUserFavourites.concat(favouritePiece);
        });
    }

    // Removing a piece from Favourites
    function removeFavouriteHandler(unfavouritePiece) {
        setUserFavourites((prevUserFavourites) => {
            return prevUserFavourites.filter((piece) => piece.tokenID !== unfavouritePiece);
        });
    }

    // Checking if the piece is favourited
    function itemIsFavouriteHandler(isFavouritePiece) {
        return userFavourites.some((piece) => piece.tokenID === isFavouritePiece);
    }

    const context = {
        favourites: userFavourites,
        totalFavourites: userFavourites.length,
        addFavourite: addFavouriteHandler,
        removeFavourite: removeFavouriteHandler,
        itemIsFavourite: itemIsFavouriteHandler,
    };

    return <FavouritesContext.Provider value={context}>{props.children}</FavouritesContext.Provider>;
}

export default FavouritesContext;
