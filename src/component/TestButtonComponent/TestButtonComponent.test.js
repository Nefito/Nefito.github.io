import React from 'react';
import ReactDOM from 'react-dom';
import TestButtonComponent from './TestButtonComponent.js';
import {render, cleanup} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import {shallow, mount } from 'enzyme';

afterEach(cleanup);

describe('rendering TestButtonComponent', () => {

    test('shallow renders without crashing', () => {
        shallow(<TestButtonComponent />);
    })
    test('mount renders without crashing', () => {
        mount(<TestButtonComponent />);
    })
    test('render renders without crashing', () => {
        render(<TestButtonComponent />);
    })
})
