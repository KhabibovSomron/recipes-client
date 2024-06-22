import { FC } from 'react'
import { Outlet } from 'react-router-dom';
import Header from './UI/header/Header';


interface ILayoutProps {

}

const Layout: FC<ILayoutProps> = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout;