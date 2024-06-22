import { FC } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { IRecipe } from "../../../redux/types/RecipeTypes";


interface IRecipeCardProps {
  recipe: IRecipe
}

const RecipeCard: FC<IRecipeCardProps> = ({recipe}) => {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={recipe.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {recipe.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {recipe.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{width: '100%', textAlign:'end'}}>
              {recipe.cooking_time} мин
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
}

export default RecipeCard;