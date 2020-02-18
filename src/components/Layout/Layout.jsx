import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = { 
        showSideDrawer: false,
     }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    };

    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    componentDidMount() {
        console.log('Layout', this.props);
    }

    render() { 
        return ( 
            <Aux>
                <Toolbar 
                    opened={this.sideDrawerOpenedHandler} 
                    sideDrawerToggled={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    closed={this.sideDrawerClosedHandler} 
                    open={this.state.showSideDrawer} />
                <main 
                    className={classes.Layout}>
                    { this.props.children }
                </main>
            </Aux>
         );
    }
}
 
export default Layout;