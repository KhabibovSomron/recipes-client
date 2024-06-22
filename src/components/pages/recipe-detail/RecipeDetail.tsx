import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/ReduxHooks";
import { IRecipe } from "../../../redux/types/RecipeTypes";
import './RecipeDetail.css'
import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteRecipe, getIngredients } from "../../../redux/requests/RecipesRequests";
import { Fab } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface IRecipeDetailProps {

}

const RecipeDetail: FC<IRecipeDetailProps> = () => {

    const navigate = useNavigate()
    const recipes = useAppSelector(state => state.recipes)
    const params = useParams()
    const dispatch = useAppDispatch()

    const [recipe, setRecipe] = useState<IRecipe>({
        id: 0,
        cooking_time: '',
        description: '',
        image: '',
        title: ''
    })

    const onDeleteClick = () => {
        dispatch(deleteRecipe(recipe.id)).then(() => {
            navigate('/')
        })
    }


    useEffect(() => {
        dispatch(getIngredients(Number(params.id)))
        setRecipe(recipes.recipes.filter(item => item.id === Number(params.id))[0])
    }, [])

    return(
        <div className="recipe_detail">
            <img src={recipe.image} />

            <Box component='section' sx={{p: 2, borderRadius: '5px', border: '1px solid rgba(224, 224, 224, 1)', margin: '10px 0'}}>
                <h1>{recipe.title}</h1>
            </Box>

            <Box component='section' sx={{p: 2, borderRadius: '5px', border: '1px solid rgba(224, 224, 224, 1)', margin: '10px 0'}}>
                {recipe.description}
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell>Ингредиенты</TableCell>
                        <TableCell align="right">количество/объем</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recipes.ingredients.map((item, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {item.title}
                            </TableCell>
                            <TableCell align="right">{item.quintity}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box component='section' sx={{p: 2, borderRadius: '5px', border: '1px solid rgba(224, 224, 224, 1)', margin: '10px 0'}}>
                Время приготовления: {recipe.cooking_time} мин
            </Box>

            <Box component='section' sx={{p: 2, borderRadius: '5px', border: '1px solid rgba(224, 224, 224, 1)', margin: '10px 0', display: 'flex', justifyContent: 'space-between'}}>
            <Fab color="secondary" aria-label="edit" style={{width: '40%', borderRadius:'5px'}} onClick={() => navigate(`/crud/${recipe.id}/`)}>
                    <EditIcon />
            </Fab>

            <Fab color="error" aria-label="edit" style={{width: '40%', borderRadius:'5px'}} onClick={onDeleteClick}>
                    <DeleteIcon />
            </Fab>
            </Box>         

        </div>

    );
}

export default RecipeDetail;