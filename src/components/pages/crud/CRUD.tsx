import { ChangeEvent, FC, useEffect, useState } from "react";
import './CRUD.css'
import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Fab, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/ReduxHooks";
import { IIngredient } from "../../../redux/types/RecipeTypes";
import BasicModal from "../../UI/modal/BasicModal";
import { recipesSlice } from "../../../redux/reducers/RecipeSlices";
import { AddRecipe, deleteIngredient, updateImageRecipe, updateRecipe } from "../../../redux/requests/RecipesRequests";


interface ICRUDProps {

}

const CRUD: FC<ICRUDProps> = () => {

    const params = useParams()
    const recipes = useAppSelector(state => state.recipes)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [id, setId] = useState<number>(-1)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [cookingTime, setCookingTime] = useState<string>('')
    const [image, setImage] = useState<any|string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [ingredient, setIngredient] = useState<IIngredient>({
        id: -1,
        quintity: '',
        title: ''
    })

    useEffect(() => {
        if (params.id !== 'add') {
            const item = recipes.recipes.filter(item => item.id === Number(params.id))[0]
            setTitle(item.title)
            setDescription(item.description)
            setCookingTime(item.cooking_time)
            setImage(item.image)
            setId(item.id)
        } else {
            dispatch(recipesSlice.actions.clearIngredients())
        }
    }, [])

    const titleInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const descriptionInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const cookingTimeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCookingTime(event.target.value)
    }

    const onFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            setImage(event.target.files[0])
        }
    }

    const onAddIncredientClick = () => {
        setIngredient({
            id: -1,
            title: '',
            quintity: ''
        })
        setIsModalOpen(true)
    }


    const onChangeIngredientHander = (index: number) => {
        setIngredient(recipes.ingredients[index])
        setIsModalOpen(true)
    }

    const onSaveClick = () => {
        if (title && description && image && cookingTime) {
            if (id < 0) {
                dispatch(AddRecipe({
                    id: id,
                    cooking_time: cookingTime,
                    description: description,
                    image: image,
                    title: title
                })).then((data) => {
                    setId(data.id)
                })
            } else {
                if (typeof(image) === 'string') {
                    dispatch(updateRecipe({
                        id: id,
                        cooking_time: cookingTime,
                        description: description,
                        image: image,
                        title: title  
                    })).then(() => {
                        if (recipes.error === '') {
                            navigate('/')
                        }
                    })
                } else {
                    dispatch(updateImageRecipe({
                        id: id,
                        cooking_time: cookingTime,
                        description: description,
                        image: image,
                        title: title  
                    })).then(() => {
                        if (recipes.error === '') {
                            navigate('/')
                        }
                    })
                }
            }
        }
    }

    const onIngredientDeleteClick = (id: number) => {
        dispatch(deleteIngredient(id))
    }

    // const onDelete


    return(
        <div className="crud">
            <img src={typeof(image) === 'string' ? image : URL.createObjectURL(image)} />

            <Button
                style={{width: '100%', margin: '20px 0'}}
                variant="contained"
                component="label"
                >
                Upload File
                <input
                    type="file"
                    name="image_url"
                    accept="image/jpeg,image/png"
                    onChange={onFileChangeHandler}
                    hidden
                />
            </Button>

            <TextField id="outlined-basic" label="Название" variant="outlined" className="inputs" value={title} onChange={titleInputHandler} />
            <Box component='section' sx={{p: 2, borderRadius: '5px', border: '1px solid rgba(224, 224, 224, 1)', margin: '10px 0'}}>
            <TextField
                id="standard-multiline-static"
                label="Описание"
                multiline
                rows={4}
                variant="standard"
                className="inputs"
                value={description}
                onChange={descriptionInputHandler}
            />
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
                            <TableCell align="right">
                                {item.quintity}
                            </TableCell>
                            <TableCell align="right">
                            <Fab color="secondary" aria-label="edit" style={{width: '100%', borderRadius:'5px'}} onClick={() => onChangeIngredientHander(index)}>
                                <EditIcon />
                            </Fab>
                            </TableCell>
                            <TableCell align="right">
                            <Fab color="error" aria-label="delete" style={{width: '100%', borderRadius:'5px'}} onClick={() => onIngredientDeleteClick(item.id)}>
                                <DeleteIcon />
                            </Fab>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Fab color="primary" aria-label="add" sx={{width: '100%', borderRadius: '5px', margin: '10px 0'}} onClick={onAddIncredientClick} disabled={id < 0}>
                <AddIcon />
            </Fab>
            <Box component='section' sx={{p: 2, borderRadius: '5px', border: '1px solid rgba(224, 224, 224, 1)', margin: '10px 0'}}>
                <TextField id="outlined-basic" type="number" label="Время приготовления (в минутах)" variant="outlined" className="inputs" value={cookingTime} onChange={cookingTimeInputHandler} />  
            </Box>
            <Fab color="primary" aria-label="save" sx={{width: '100%', borderRadius: '5px', margin: '10px 0'}} onClick={onSaveClick}>
                Сохранить
            </Fab>
            <BasicModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} ingredient={ingredient} recipe_id={id} />
        </div>
    );
}

export default CRUD;