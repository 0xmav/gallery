import React from "react";
import Footer from "./components/Footer";
import CollectionGrid from "./components/CollectionGrid";
import CollectionPage from "./components/CollectionPage";
import { Route, Routes } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import "./normalize.css";
import "./style.css";
import FavouritesPage from "./components/FavouritesPage";

function App() {
    return (
        <>
            <AnimatePresence mode="wait">
                <motion.div
                    key={Route}
                    initial="initialState"
                    animate="animateState"
                    exit="exitState"
                    transition={{ duration: 1 }}
                    variants={{ initialState: { opacity: 0 }, animateState: { opacity: 1 }, exitState: {opacity: 0} }}
                >
                        <Routes>
                            <Route path="/" exact element={<CollectionGrid />} />
                            <Route path="/collection/:project_id" element={<CollectionPage />} />
                            <Route path="/favourites" element={<FavouritesPage />} />
                        </Routes>
                    <Footer />
                </motion.div>
            </AnimatePresence>
        </>
    );
}

export default App;
