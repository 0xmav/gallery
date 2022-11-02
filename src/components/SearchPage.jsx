import React from "react";

const filteredData = data.filter((el) => {
    //if no input the return the original
    if (props.input === '') {
        return el;
    }
    //return the item which contains the user input
    else {
        return el.text.toLowerCase().includes(props.input)
    }
})