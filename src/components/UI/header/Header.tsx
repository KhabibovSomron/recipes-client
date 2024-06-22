import { FC } from "react";
import './Header.css'
import { useNavigate } from "react-router-dom";

interface IHeaderProps {

}

const Headers: FC<IHeaderProps> = () => {
    const navigate = useNavigate()
    return(
        <header>
            <h1 onClick={() => navigate('/')}>Recipes</h1>
        </header>
    );
}

export default Headers;