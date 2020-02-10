import React from 'react';
import Auxillary from '../../hoc/Auxillary';
import classes from './Layout.module.css'

const Layout = (props) => {
    return ( 
        <Auxillary>
            <div>ToolBar, SideBarDrawer, Backdrop</div>
            <main className={classes.Layout}>{ props.children }</main>
        </Auxillary>
     );
}
 
export default Layout;