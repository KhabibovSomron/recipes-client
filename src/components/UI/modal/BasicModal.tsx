import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IIngredient } from '../../../redux/types/RecipeTypes';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Fab, TextField } from '@mui/material';
import { useAppDispatch } from '../../../hooks/ReduxHooks';
import { AddIngredient, updateIngredient } from '../../../redux/requests/RecipesRequests';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const inputStyle = {
    width: '100%',
    margin: '10px'
}

interface IBasicModal {
    isOpen: boolean,
    setIsOpen: Function,
    ingredient: IIngredient,
    recipe_id: number
}

const BasicModal: FC<IBasicModal> = ({isOpen, setIsOpen, ingredient, recipe_id}) => {

    const handleClose = () => setIsOpen(false);
    const dispatch = useAppDispatch()

    const [title, setTitle] = useState('')
    const [quintity, setQuintity] = useState('')

    useEffect(() => {
        setTitle(ingredient.title)
        setQuintity(ingredient.quintity)
    }, [ingredient])

    const titleInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const quintityInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setQuintity(event.target.value)
    }

    const onAddClickHander = () => {
        if (title && quintity) {
            dispatch(AddIngredient({
                id: 0,
                quintity: quintity,
                title: title
            }, recipe_id)).then(() => {
                setIsOpen(false)
            })
        }
    }

    const onEditClickHander = () => {
        if (title && quintity) {
            dispatch(updateIngredient({
                id: ingredient.id,
                quintity: quintity,
                title: title
            })).then(() => {
                setIsOpen(false)
            })
        }
    }

    return (
        <div>
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{width:'100%', textAlign: 'center'}}>
                {ingredient.id < 0 ? 'Добавление ингредиента': 'Изменение ингредиента'}
            </Typography>
            <TextField id="outlined-basic" label="Название" variant="outlined" value={title} onChange={titleInputHandler} style={inputStyle} />
            <TextField id="outlined-basic" label="Количество/объем" variant="outlined" value={quintity} onChange={quintityInputHandler} style={inputStyle} />
            {
                ingredient.id < 0 ?
                <Fab color="primary" aria-label="add" style={{width: '100%', borderRadius:'5px', margin:'10px'}} onClick={onAddClickHander}>
                    Добавить
                </Fab>
                :
                <Fab color="secondary" aria-label="edit" style={{width: '100%', borderRadius:'5px', margin:'10px'}} onClick={onEditClickHander}>
                    Изменить
                </Fab>
            }
            </Box>
        </Modal>
        </div>
    );
}

export default BasicModal;