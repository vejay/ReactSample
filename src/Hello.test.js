import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/* This is a "JEST' test */

//A react 'function' component.
const Hello = (props) => {
    return <h1>Hello at {props.now}</h1>
};

//This is what is returned from the Hello function when called directly
/*
    result{"type":"h1","key":null,"ref":null,
            "props":{"children":["Hello at ","2018-12-29T18:32:39.118Z"]},
             "_owner":null,"_store":{}}
 */

//You are testing the output of the function...no DOM related tests here.
//just testing the returned string.
describe('when testing directly', function() {
    let result;
    beforeAll(() => {
      result = Hello({now:new Date().toISOString()});
    });

    it('should return a value', function() {
       expect(result).not.toBeNull();
    });

    it('is a h1 element', function(){
        expect(result.type).toBe('h1');
    });

    it('has children', function(){
        console.log('result' + JSON.stringify(result));
        expect(result.props.children).not.toBeNull();
    })
});


describe('when testing with ReactDOM', function(){
    it('renders without crashing', function() {
        //Create a dom element
        const div = document.createElement('div');
        ReactDOM.render(<Hello now={new Date().toISOString()} />, div);
    });
});

/** These are ENZYME tests **/

Enzyme.configure({adapter: new Adapter});
const moment = new Date();
console.log(moment);

describe('when testing with enzyme', function(){
    it('renders a h1', function(){

        const wrapper = shallow(<Hello now={new Date().toISOString()}/>);
        expect(wrapper.find('h1').length).toBe(1);

    });

    it('result contains Hello at a timestamp', function(){
       const wrapper = shallow(<Hello new={moment.toISOString()} />);
       console.log(wrapper);
       //expect(wrapper.contains(<h1> Hello at 2018-12-29T22:53:18.512Z</h1>)).toBe(true);
    });
});