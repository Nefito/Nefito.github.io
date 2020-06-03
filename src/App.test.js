import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { sum } from './math'
import { shallow, mount } from 'enzyme';

describe('some fake tests to test jest (pun intended)', () => {

    test('FAKE: sums numbers with sum()', () => {
        expect(sum(2, 2)).toBe(4);
        expect(sum(2, '2')).toBe("Agruments should be type of Number!");
    })
})

describe('rendering App component', () => {

    test('shallow renders without crashing', () => {
        shallow(<App />);
    })
    test('mount renders without crashing', () => {
        mount(<App />);
    })
    test('render renders without crashing', () => {
        render(<App />);
    })
})
