import artBlocksCollections from "./collections";

const artBlocksURL = "https://token.artblocks.io/";

// Generating random piece and a collection
export default async function artblocksFetchRandom() {
    const rand = Math.floor(Math.random() * artBlocksCollections.length);
    const randomProjectID = artBlocksCollections[rand].tokenID;
    const randomTokenID = zeroPad(Math.floor(Math.random() * artBlocksCollections[rand].mintedTokens), 6);
    const tokenID = randomProjectID + randomTokenID;

    const res = await fetch(artBlocksURL + tokenID);
    const data = await res.json();

    return data;
}

// Getting a project link
export async function artblocksFetchProject(projectID) {
    const randomTokenID = zeroPad(Math.floor(Math.random() * artBlocksCollections.find((o) => o.project_id === projectID).mintedTokens), 6);
    const tokenID = projectID + randomTokenID;

    const res = await fetch(artBlocksURL + tokenID);
    const data = await res.json();

    return data;
}

// Genrating a full metadata link
export async function artblocksFetchToken(projectID, tokenID) {
    const link = projectID + zeroPad(tokenID, 6);

    const res = await fetch(artBlocksURL + link);
    const data = await res.json();

    return data;
}

const zeroPad = (num, places) => String(num).padStart(places, "0");