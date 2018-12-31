import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
import {BrowserRouter, Route} from 'react-router-dom';
import {createStore} from 'redux';
import mapStateToProps from "react-redux/es/connect/mapStateToProps";
import mapDispatchToProps from "react-redux/es/connect/mapDispatchToProps";
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';


const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Finn']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Heart of Darkness']
    },
    {
        name: 'J.K. Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Harry Potter and the Sorcerers Stone']
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/stephenking.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Shining', 'IT']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['David CopperField', 'A Tale Of Two Cities']
    },
    {
        name: 'Willam Shakesphere',
        imageUrl: 'images/authors/williamshakesphere.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
    }
];

const randomTurnData = () => {
    const allBooks = authors.reduce(function(p,c,i){
        return p.concat(c.books);
    }, []);

    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) =>
            author.books.some((title) =>
                title === answer))
        }
};

const App = () => {
    return (
        <ReactRedux.Provider store={store}>
            <AuthorQuiz />
        </ReactRedux.Provider>
    );
};

const AddAuthorForm = ({match}) => {
    return (
        <div>
           <h1>Add Author</h1>
            <p>{JSON.stringify(match)}</p>
        </div>
    )
};

const reducer = (state = {authors, turnData: randomTurnData(authors), highlight: ''}, action) => {
    switch(action.type) {
        case 'ANSWER_SELECTED':
            console.log(JSON.stringify(action));
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            return Object.assign({}, state, {highlight: isCorrect ? 'correct': 'wrong'});
        case 'CONTINUE':
            return Object.assign({},state, {
                    highlight: '',
                    turnData: randomTurnData()
            });
        default:
            return state;
    }
};

let store = Redux.createStore(reducer);

function render() {
    ReactDOM.render(
        <BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={App} />
                <Route exact path="/add" component={AddAuthorForm} />
            </React.Fragment>
        </BrowserRouter>,
        document.getElementById('root'));
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
