import React from 'react';
import logoImage from '../../assests/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = () => {
    return ( 
        <div className={classes.Logo}>
            <img src={logoImage} alt="BurgerLogo" />
        </div>
     );
}
 
export default Logo;