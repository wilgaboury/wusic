import { Component } from "solid-js";

import styles from './Navbar.module.css'

interface NavbarItemProps {
    text: string
}

const NavbarItem: Component<NavbarItemProps> = (props) => {
    return (
        <div class={`${styles.NavbarItem}`}>
            {props.text}
            <div class={styles.NavbarItemLine}/>
        </div>
    );
}

const Navbar: Component = () => {
    return (
        <div class={styles.Navbar}>
            <NavbarItem text="Search"/>
            <NavbarItem text="Artists"/>
            <NavbarItem text="Playlists"/>
            <NavbarItem text="Queue"/>
        </div>
    );
};

export default Navbar;