import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import {Link} from 'react-router-dom';

const Hero = () => {
  return (
       <div className="row">
          <div className="jumbotron col-10 offset-1">
            <h1> Author Quiz</h1>
            <p>Select the book written by the author shown.</p>
          </div>
       </div>
  )
};

const Book = ({title,clickHandler}) => {
    return (
        <div className="answer" onClick={() => {clickHandler(title);}}>
            <h4>{title}</h4>
        </div>
    )
};

const Turn = ({author,books, highlight, onAnswerSelected}) => {
    function highlightToBgColor(highlight) {
        const mapping = {
            'none': '',
            'correct': 'green',
            'wrong': 'red'
        };
        return mapping[highlight];
    }

    return (
        <div className="row turn" style={{backgroundColor: highlightToBgColor(highlight)}}>
            <div className="col-4 offset-1">
                <img src={author.imageUrl} className="authorimage" alt="Author" />
            </div>

            <div className="col-6">
                {books.map((title) => <Book title={title} key={title} clickHandler={onAnswerSelected} /> )}
            </div>
        </div>
    );

};

Turn.propTypes = {
  author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      imageSource: PropTypes.string.isRequired,
      books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequirred,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

const Continue = () => {
    return null;
};


const Footer = () => {
    return (
        <div className="row"  id="footer">
            <div className="col-12">
                <p className="text-muted credit"> All images are from Wikimedia and are in the public domain </p>
            </div>
        </div>
    )
};

class Identity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: ''
        };
    };

    onFieldChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <form>
                <input type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.onFieldChange}></input>
                <input type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.onFieldChange}></input>
            </form>
        );
    }
};


const formSchema = {
    "title": "JSON Schema Form",
    "type": "object",
    "properties": {
        "firstName": {
            "type": "string",
            "title": "First Name",
            "minLength": 1,
            "maxLength": 6
        },
        "lastName": {
            "type": "string",
            "title": "Last Name"
        },
        "age": {
            "type": "number",
            "title": "Age"
        }
    },
    "required": [
        "firstName",
        "lastName"
    ]
};


const LineBreakDiv = () => {
    return (
        <div>
            <br />
        </div>
    );
};

class JsonIdentityForm extends React.Component {
    render() {
        return (
            <Form schema={formSchema} noHTML5Validate onSubmit={console.log} showErrorList={false}>
            </Form>
        );
    }
};

const AuthorQuiz = ({turnData, highlight, onAnswerSelected}) => {
    return (
        <div className="container-fluid">
            <Hero/>
            <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
            <Continue/>
            <p><Link to="/add">Add an Author</Link></p>
            <Footer/>
            <Identity />
            <LineBreakDiv />
            <JsonIdentityForm />
        </div>
    );
};

export default AuthorQuiz;
