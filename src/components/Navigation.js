import React from 'react'; 
import styled from 'styled-components'; 
import { Link } from 'react-router-dom'; 

const Nav = styled.nav`
    padding: 1em; 
    background: #f5f4f0; 

    @media (max-width: 700px){
        padding-top: 64px; 
    }

    @media (min-width: 700px){
        position: fixed; 
        width: 220px; 
        height: calc(100% - 64px); 
        overflow-y: scroll; 
    }
`;

const NavList = styled.ul`
    margin: 0; 
    padding: 0; 
    list-style: none; 
    line-height: 2; 

    a{
        text-decoration: none; 
        font-weight: bold; 
        font-size: 1.1em; 
        color: #333; 
    }

    a:visited{
        color: #333; 
    }

    a:hover,
    a:focus{
        color: #0077cc; 
    }
`; 

const Navigation = () => {
    return (
        <Nav>
            <NavList>
                <li>
                    <span aria-hidden="true" role="img">
                        🏠
                    </span>{' '}
                    <Link to="/">
                        Inicio
                    </Link>
                </li>
                <li>
                    <span aria-hidden="true" role="img">
                        📓
                    </span>{' '}
                    <Link to="/mynotes">Mis Notas</Link>
                </li>
                <li>
                    <span aria-hidden="true" role="img">
                        ⭐️
                    </span>{' '}
                    <Link to="/favorites">Favoritos</Link>
                </li>
                <li>
                    <span aria-hidden="true" role="img">
                        📝
                    </span>{' '}
                    <Link to="/new">
                        Nuevo
                    </Link>
                </li>
            </NavList>
        </Nav>
    );
}; 

export default Navigation; 