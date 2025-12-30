import React from 'react';
import styled from 'styled-components';
import Button from './buttons/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { AddRounded, WebRounded } from '@mui/icons-material';


const Container = styled.div`
flex: 1;
display: flex;
background: ${({ theme }) => theme.navbar};
color :${({ theme }) => theme.menu_primary_text};
font-weight: bold;
font-size: 22px;
align-items: center;
justify-content: space-between;
padding: 14px 50px;
box-shadow: 0 0 10px rgba(0,0,0,0.15);
@media only screen and (max-width: 600px) {
padding: 10px 12px;
}
`;



const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    let path = location.pathname.split("/");

    const gotoCreatePost = () => {
        navigate("/create-post");
    }

    const gotoHome = () => {
        navigate("/");
    }
    return (
        <Container>
            GemAI
            {path[1] === "create-post" ? (
                <Button
                    text="Explore Posts"
                    leftIcon={<WebRounded style={{ fontSize: "18px" }} />}
                    onClick={gotoHome}
                    type="secondary"
                />
            ) : (
                <Button
                    text="Create Post"
                    leftIcon={<AddRounded style={{ fontSize: "18px" }} />}
                    onClick={gotoCreatePost}
                />
            )}
        </Container>);
};

export default Navbar;