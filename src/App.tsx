
import { FC } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './components/pages/main/Main';
import RecipeDetail from './components/pages/recipe-detail/RecipeDetail';
import CRUD from './components/pages/crud/CRUD';

interface IAppProps {

}

const App: FC<IAppProps> = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Main />} />
        <Route path='/recipe-detail/:id/' element={<RecipeDetail />} />
        <Route path='/crud/:id/' element={<CRUD />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
