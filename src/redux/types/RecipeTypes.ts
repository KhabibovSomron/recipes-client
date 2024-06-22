export interface IIngredient {
    id: number,
    title: string,
    quintity: string,
}

export interface IRecipe {
    id: number,
    title: string,
    description: string,
    cooking_time: string,
    image: string | any
}