import { Nav, Dropdown } from 'react-bootstrap';
import { NavLink, Link, useLocation } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import classNames from 'classnames';

type MenuProps = {
    showDownload?: boolean;
    navClass?: string;
    buttonClass?: string;
    loggedInUser?: {};
};

const Menu = ({ navClass, buttonClass, showDownload, loggedInUser }: MenuProps) => {
    let location = useLocation();

    const isActiveRoute = (path: string) => {
        if (location.pathname) {
            return location.pathname.includes(path);
        }
        return false;
    };

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
                <a href="https://github.com/Tail-Database/tail-database-app" target="_blank" className="btn btn-primary btn-sm">
                    Download
                </a>
            </Nav.Item>
        </Nav>
    );
};

export default Menu;
