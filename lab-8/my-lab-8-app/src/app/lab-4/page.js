"use client"
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// styled Div
const StyledDiv = styled.div`        
            background-color: yellow;
            margin: 30px;        
            border: 0.5px solid red;
            box-shadow: 2px 2px 4px 4px red;
        `;

// styled h1
const StyleHea1 = styled.h1`                         
            color: blue;
            padding: 10px;
            font-size: 50px;
            font-family: arial;
        `;

// styled h2
const StyleHea2 = styled.h2`                         
            color: blue;
            padding: 10px;
            font-size: 35px;
            font-family: arial;
        `;

// styled li
const StyleLi = styled.li`                         
            color: ${props => props.color};;
            font-size: 25px;
            font-family: Verdana;
        `;

// header with title and subtitle
const Header = () => {
    return (<>
        <StyleHea1 data-testid="heading-1">Favourite Movies</StyleHea1>
        <StyleHea2>by Victor Munoz</StyleHea2>
    </>);
}

// elemtens li
const FavoriteItem = ({ itemName, itemLink, itemRating }) => {
    return (
        <>
            <StyleLi color="green"> {itemName}:&nbsp;&nbsp; <a href={itemLink} target="_blank">{itemLink}</a> &nbsp;&nbsp;Rating: {itemRating} </StyleLi>
        </>
    );
}

// function map
const FavoriteItemList = ({ items }) => {
    return (
        <ul>
            {items.map((value, index) => <FavoriteItem key={index} itemName={value.name} itemLink={value.url} itemRating={value.rating} />)}
        </ul>
    );
}

const App = () => {
    // define useState
    const [itemsData, setItems] = useState([]);

    // using useEffect
    useEffect(() => {
        // if I need to use await I need to use async
        (async () => {
            try {
                // request the url and using await to wait the data
                const { data } = await axios.get("http://victor.211.ics.compsci.cc:3326/favorite-items");
                //console.log(data); 
                // send the data 
                setItems(data);
            }
            catch (error) {
                // send an error if didn't work
                console.log('API Error: ' + error);
            }
        }
        )();
        // [] to executed only one time                
    }, []);

    return (
        <StyledDiv>
            <Header />
            <FavoriteItemList items={itemsData} />
        </StyledDiv>
    );
};

export default App;