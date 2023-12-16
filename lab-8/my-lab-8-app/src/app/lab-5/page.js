"use client"
import { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// styled Div
const StyledDiv = styled.div`    
            background: #FF8 linear-gradient(#8EFF2F, transparent);                            
            margin: 30px;        
            border: 0.5px solid red;
            box-shadow: 2px 2px 4px 4px red;
            display: flex;
            flex-direction: column;
            align-items: center; 
            padding: 15px;
        `;

// styled h1
const StyleHea1 = styled.h1`                               
            color: blue;
            font-size: 40px;
            font-family: sans-serif;
        `;

// styled h2
const StyleHea2 = styled.h2`                                           
            color: blue;        
            font-size: 20px;
            font-family: sans-serif;
        `;

// styled h1
const StyleHea3 = styled.h3`                                                   
            font-size: 25px;
            font-family: sans-serif;
            font-weight: bold;
        `;

// styled li
const StyleLi = styled.li`                         
            color: ${props => props.color};;
            font-size: 25px;   
            font-family: arial;         
        `;

// header with title and subtitle & symbol
const Header = () => {
    return (<>
        <StyleHea1 data-testid="heading-1">Favourite Movies</StyleHea1>
        <StyleHea2>&#9400;   by Victor Munoz   </StyleHea2>
    </>);
}

// function map to add all the values     
const FavoriteItemList = ({ items }) => {
    return (
        <ul data-testid="lab-5-ul">
            {items.map((value) => (
                <FavouriteItem key={value.id} {...value} />
            ))}
        </ul>
    );
}

// elemtens li               
const FavouriteItem = ({ name, url, rating, checked }) => {
    // if something is checkec then return it
    if (checked) {
        return (
            <>
                <StyleLi color="red">{name}:&nbsp;&nbsp; 
                <a href={url} target="_blank">{url}
                </a> &nbsp;&nbsp;Rating: {rating} 
                </StyleLi>
            </>);
    } else {
        return null;
    }
}

const App = () => {

    // define useState                        
    const [itemsData, setItems] = useState([]);
    // add property Showform with state
    const [showForm, setShowForm] = useState(true);

    // using useEffect
    useEffect(() => {
        (async () => {
            try {
                // request the url and using await to wait the data
                const { data } = await axios.get("http://victor.211.ics.compsci.cc:3326/favorite-items");
                //console.log(data);
                setItems(data);     // send the data 
            }
            catch (error) {
                console.log('API Error: ' + error);     // send an error if didn't work
            }
        }
        )();
    }, [showForm]);     // [] to executed only one time, new function showForm              

    // if is true go to ItemForm otherwise ItemList
    return (
        <>
            <Header />
            {showForm
                ? <FavoriteItemForm items={itemsData} setShowForm={setShowForm} />
                : <FavoriteItemList items={itemsData} />}
        </>
    );
};

//  new element for items & setShowForm
const FavoriteItemForm = ({ items, setShowForm }) => {

    // use State
    const [checkboxGroup, setCheckboxGroup] = useState([false, false, false, false, false]);

    // Implementing the handleCheckbox Event Handler
    const handleCheckbox = e => {
        const index = parseInt(e.target.value, 10);
        const checkboxes = checkboxGroup.slice();
        checkboxes[index] = e.target.checked;
        setCheckboxGroup(checkboxes);
    }

    // Add Form Submission to my Form & valid if any checkbox were selected
    let enableSubmit = false;
    for (const checked of Object.values(checkboxGroup)) {
        if (checked) enableSubmit = true;
    };

    //Sending Data to my JSON API Server
    const handleSubmit = (e) => {
        e.preventDefault();
        Promise.all(
            checkboxGroup.map(async (item, index) => {
                console.log('Moive', index, 'isChecked:', item);
                try {                    
                    await axios.patch(`http://victor.211.ics.compsci.cc:3326/favorite-items/${index}`,
                        { "checked": item });
                }
                catch (error) {
                    console.log('API Error: ' + error);
                }
            })
        ).then(() => { setShowForm(false); });
    }

    // create the element box with my name items and submit bottom
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <StyleHea3><legend>Select your favourite items:</legend></StyleHea3>
                {items.map(movies =>
                    <Fragment key={movies.id}>
                        <label>
                            <input type='checkbox' name='checkboxGroup' 
                                value={movies.id}                                 
                                checked={checkboxGroup[movies.id]}
                                onChange={handleCheckbox} 
                                data-testid={`favitem-${movies.id}`} 
                                />
                            <span style={{ fontWeight: 'bold' }}>{movies.name}</span>
                        </label >
                        <br /><br />
                    </Fragment>
                )}
                {enableSubmit   // botom submit
                    ? <input type='submit' value='Submit' data-testid="submit-form"/>
                    : <input type='submit' value='Submit' data-testid="submit-form" disabled />
                }
            </fieldset>
        </form>
    );
};

export default App;