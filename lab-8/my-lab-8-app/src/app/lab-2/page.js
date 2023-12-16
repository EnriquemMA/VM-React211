// create th array with options
const my2DArray = [
    ["Spider-man", "https://www.imdb.com/title/tt10872600/"],
    ["The Avengers", "https://en.wikipedia.org/wiki/The_Avengers_(2012_film)"],
    ["Fast XXX", "https://wall.alphacoders.com/big.php?i=1319315&lang=Spanish"]
];

// element to call every element into the array
function FavoriteItemList() {
    return (
        <>
            <ul>
                <FavoriteItem itemName={my2DArray[0][0]} itemLink={my2DArray[0][1]} />
                <FavoriteItem itemName={my2DArray[1][0]} itemLink={my2DArray[1][1]} />
                <FavoriteItem itemName={my2DArray[2][0]} itemLink={my2DArray[2][1]} />
            </ul>
        </>
    );
}

// header element
function Header() {
    return (
        <>
            <h1 data-testid="heading-1">Favourite Movies</h1>
            <h2>by Victor Munoz</h2>
        </>
    );
}

// element to create every li
function FavoriteItem(props) {
    return (
        <>
            <li>{props.itemName}:&nbsp;&nbsp;<a href={props.itemLink} target="_blank">{props.itemLink}</a></li>
        </>
    );
}

// element to call the others elements
export default function App() {
    return (
        <>
            <Header />
            <FavoriteItemList />
        </>
    );
}

