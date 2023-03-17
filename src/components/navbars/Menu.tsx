import { useEffect } from 'react';
import { Nav, Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';


type MenuProps = {
    showDownload?: boolean;
    navClass?: string;
    buttonClass?: string;
    loggedInUser?: {};
};

const Menu = ({ navClass }: MenuProps) => {

    return (
        <Nav as="ul" className={classNames('align-items-lg-center', navClass)}>
            <Nav.Item as="li">
                <NavLink to="/" end className={classNames('nav-link', ({ ...isActive }) => isActive && 'active')}>
                    Home
                </NavLink>
            </Nav.Item>

            <Nav.Item as="li">
                <NavLink to="/explore" className="nav-link btn me-2 shadow-none">
                    Explore
                </NavLink>
            </Nav.Item>

            <Nav.Item as="li">
                <NavLink to="/addTail" className="nav-link btn me-2 shadow-none">
                    Add TAIL
                </NavLink>
            </Nav.Item>

            <Nav.Item as="li">
                <a
                    href="https://github.com/Tail-Database/tail-database-app"
                    target="_blank"
                    className="btn btn-primary btn-sm"
                >
                    Download
                </a>
            </Nav.Item>
        </Nav>
    );
};

export default Menu;
