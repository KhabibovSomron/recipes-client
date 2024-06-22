import axios from "axios"
import { AppDispatch } from "../Store"
import { recipesSlice } from "../reducers/RecipeSlices"
import { ADD_INGREDIENT_URL, ADD_RECIPE_URL, DESTROY_INGREDIENT_URL, DESTROY_RECIPE_URL, INGREDIENTS_URL, RECIPES_URL, UPDATE_INGREDIENT_URL, UPDATE_RECIPE_IMAGE_URL, UPDATE_RECIPE_URL } from "./endpoints"
import { IIngredient, IRecipe } from "../types/RecipeTypes"


export const getRecipes = (search: string, ordering: string) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(recipesSlice.actions.recipesListLoading())
        const res = await axios.get(RECIPES_URL + `?ordering=${ordering}&search=${search}`)
        dispatch(recipesSlice.actions.recipesListLoadingSuccess(res.data))
    } catch (e: any) {
        dispatch(recipesSlice.actions.recipesListLoadingFailed(e.message))
    }    
}

export const getIngredients = (recipe_id: number) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(recipesSlice.actions.ingredientsListLoading())
        const res = await axios.get(INGREDIENTS_URL+ `?recipe=${recipe_id}`)
        dispatch(recipesSlice.actions.ingredientsListLoadingSuccess(res.data))
    } catch (e: any) {
        dispatch(recipesSlice.actions.ingredientsListLoadingFailed(e.message))
    }    
}


export const deleteRecipe = (recipe_id: number) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(recipesSlice.actions.recipeDeleting())
        await axios.delete(DESTROY_RECIPE_URL + `${recipe_id}/`)
        dispatch(recipesSlice.actions.recipeDeletingSuccess(recipe_id))
    } catch (e: any) {
        dispatch(recipesSlice.actions.recipeDeletingFailed(e.message))
    }    
}


export const AddIngredient = (ingredient: IIngredient, recipe_id: number) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(recipesSlice.actions.ingredientAdding())
        const res = await axios.post(ADD_INGREDIENT_URL, {
            "title": ingredient.title,
            "quintity": ingredient.quintity,
            "recipe": recipe_id
        })
        dispatch(recipesSlice.actions.ingredientAddingSuccess({
            id: res.data['id'],
            quintity: res.data['quintity'],
            title: res.data['title']

        }))
    } catch (e: any) {
        dispatch(recipesSlice.actions.ingredientAddingFailed(e.message))
    }    
}


export const AddRecipe = (recipe: IRecipe) =>async (dispatch:AppDispatch) => {
    try {
        const upload_data = new FormData()
        upload_data.append('title', recipe.title)
        upload_data.append('description', recipe.description)
        upload_data.append('cooking_time', recipe.cooking_time)
        upload_data.append('image', recipe.image, recipe.image.name)
        dispatch(recipesSlice.actions.recipeAdding())
        const res = await axios.post(ADD_RECIPE_URL, upload_data)
        dispatch(recipesSlice.actions.recipeAddingSuccess(res.data))
        return res.data
    } catch (e: any) {
        dispatch(recipesSlice.actions.recipeAddingFailed(e.message))
        return false
    }    
}

export const updateRecipe = (recipe: IRecipe) =>async (dispatch:AppDispatch) => {
    try {


        const data = {
            "title": recipe.title,
            "description": recipe.description,
            "cooking_time": recipe.cooking_time
        }
        
        dispatch(recipesSlice.actions.recipeEditing())
        const res = await axios.put(UPDATE_RECIPE_URL + `${recipe.id}/`, data)
        dispatch(recipesSlice.actions.recipeEditingSuccess({
            id: res.data['id'],
            title: res.data['title'],
            description: res.data['description'],
            cooking_time: res.data['cooking_time'],
            image: recipe.image
        }))
    } catch (e: any) {
        dispatch(recipesSlice.actions.recipeEditingFailed(e.message))
    }    
}

export const updateImageRecipe = (recipe: IRecipe) =>async (dispatch:AppDispatch) => {
    try {


        const data = new FormData()
        data.append('image', recipe.image, recipe.image.name)
        
        dispatch(recipesSlice.actions.recipeEditing())
        const res = await axios.put(UPDATE_RECIPE_IMAGE_URL + `${recipe.id}/`, data)
        dispatch(recipesSlice.actions.recipeEditingSuccess({
            id: recipe.id,
            title: recipe.title,
            description: recipe.description,
            cooking_time: recipe.cooking_time,
            image: res.data['image']
        }))
    } catch (e: any) {
        dispatch(recipesSlice.actions.recipeEditingFailed(e.message))
    }    
}

export const updateIngredient = (ingredient: IIngredient) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(recipesSlice.actions.ingredientEditing())
        const res = await axios.put(UPDATE_INGREDIENT_URL + `${ingredient.id}/`, {
            "title": ingredient.title,
            "quintity": ingredient.quintity,
        })
        dispatch(recipesSlice.actions.ingredientEditingSuccess({
            id: res.data['id'],
            quintity: res.data['quintity'],
            title: res.data['title']

        }))
    } catch (e: any) {
        dispatch(recipesSlice.actions.ingredientEditingFailed(e.message))
    }    
}


export const deleteIngredient = (id: number) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(recipesSlice.actions.ingredientDeleting())
        await axios.delete(DESTROY_INGREDIENT_URL + `${id}/`)
        dispatch(recipesSlice.actions.ingredientDeletingSuccess(id))
    } catch (e: any) {
        dispatch(recipesSlice.actions.ingredientAddingFailed(e.message))
    }    
}


