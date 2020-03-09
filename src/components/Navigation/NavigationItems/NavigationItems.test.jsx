import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure( { adapter: new Adapter() } );

describe('<NavigationItems />', () => {
    let wrapper = null;

    //It will run at the begging of each test ie it()
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });
    
    it('should render two <NavigationItem /> elements when isAuthenticated is false', () => {      
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 <NavigationItem /> elements when isAuthenticated is truthy', () => {
        // const wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render logout link when isAuthenticated is truthy', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.contains(<NavigationItem link={'/logout'} >Logout</NavigationItem>)).toEqual(true);
    });
});

