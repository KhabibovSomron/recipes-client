import { ChangeEvent, FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/ReduxHooks";
import { getRecipes } from "../../../redux/requests/RecipesRequests";
import RecipeCard from "../../UI/card/RecipeCard";
import './Main.css'
import { Link, useNavigate } from "react-router-dom";
import { Box, Fab, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


interface IMainProps {

}

const Main: FC<IMainProps> = () => {

    const navigate = useNavigate()
    const recipes = useAppSelector(state => state.recipes)
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState<string>('')
    const [ordering, setOrdering] = useState<string>('')
    
    const onSearchInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }


    useEffect(() => {
        dispatch(getRecipes(search, ordering))
    }, [ordering])

    const onSearchClick = () => {
        dispatch(getRecipes(search, ordering))
    }

    const onOrderingSelectHandler = (event: SelectChangeEvent) => {
        setOrdering(event.target.value);
    };
    

    return(
        <div className="main">
            <Box component='section' sx={{p: 2, borderRadius: '5px', border: '1px solid rgba(224, 224, 224, 1)', margin: '10px 0', display: 'flex', flexDirection:'column', alignItems: 'center'}}>

                <TextField id="outlined-basic" label="Поиск" variant="outlined" className="inputs" value={search} onChange={onSearchInputHandler} />
                
                <Fab color="primary" aria-label="search" sx={{ borderRadius: '5px', margin: '10px 0', width: '30%'}} onClick={onSearchClick}>
                    Поиск
                </Fab>      
            </Box>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Сортировка</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ordering}
                    label="Сортировка"
                    onChange={onOrderingSelectHandler}
                >
                    <MenuItem value='title'>По названию (в алфавитном порядке)</MenuItem>
                    <MenuItem value='-title'>По названию (наоборот)</MenuItem>
                    <MenuItem value='cooking_time'>По времени приготовления (по возрастанию)</MenuItem>
                    <MenuItem value='-cooking_time'>По времени приготовления (по убыванию)</MenuItem>
                </Select>
            </FormControl>
            <Box component='section' sx={{p: 2, borderRadius: '5px', border: '1px solid rgba(224, 224, 224, 1)', margin: '10px 0', display: 'flex', justifyContent:'center', alignItems: 'center', flexWrap:'wrap'}}>
                {
                    recipes.recipes.map((item, index) => {
                        return(
                            <Link to={`recipe-detail/${item.id}/`} key={index} className="links">
                                <RecipeCard recipe={item}/>
                            </Link>
                        )
                    })
                }
            </Box>                          
                            
                <Fab color="primary" aria-label="add" style={{position: 'fixed', bottom: '10px', right: '10px'}} onClick={() => navigate('/crud/add/')}>
                    <AddIcon />
                </Fab>
        </div>
    );
}

export default Main;