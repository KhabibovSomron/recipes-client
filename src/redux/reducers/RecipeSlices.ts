import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient, IRecipe } from "../types/RecipeTypes";



interface IRecipesState {
    recipes: Array<IRecipe>,
    ingredients: Array<IIngredient>,
    isLoading: boolean,
    error: string
}

const initialState: IRecipesState = {
    recipes: [],
    ingredients: [],
    isLoading: false,
    error: ''
}

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        recipesListLoading(state) {
            state.isLoading = true
            state.error = ''
        },

        recipesListLoadingSuccess(state, action: PayloadAction<Array<IRecipe>>) {
            state.isLoading = false
            state.recipes = action.payload
            state.error = ''
        },

        recipesListLoadingFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },

        ingredientsListLoading(state) {
            state.isLoading = true
            state.error = ''
        },

        ingredientsListLoadingSuccess(state, action: PayloadAction<Array<IIngredient>>) {
            state.isLoading = false
            state.ingredients = action.payload
            state.error = ''
        },

        ingredientsListLoadingFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },

        clearIngredients(state) {
            state.error = ''
            state.isLoading = false
            state.ingredients = []
        },

        recipeDeleting(state) {
            state.isLoading = true
            state.error = ''
        },

        recipeDeletingSuccess(state, action: PayloadAction<number>) {
            state.isLoading = false
            state.error = ''
            state.recipes = state.recipes.filter((item) => item.id !== action.payload)
        },

        recipeDeletingFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },

        recipeAdding(state) {
            state.isLoading = true
            state.error = ''        
        },

        recipeAddingSuccess(state, action: PayloadAction<IRecipe>) {
            state.isLoading = false
            state.error = ''
            state.recipes = [...state.recipes, action.payload]
        },

        recipeAddingFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },

        recipeEditing(state) {
            state.isLoading = true
            state.error = ''        
        },

        recipeEditingSuccess(state, action: PayloadAction<IRecipe>) {
            state.isLoading = false
            state.error = ''
            const index = state.recipes.findIndex((item) => item.id === action.payload.id)
            if (index !== -1) {
                state.recipes[index] = action.payload
            } 
        },

        recipeEditingFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },


        ingredientAdding(state) {
            state.isLoading = true
            state.error = ''        
        },

        ingredientAddingSuccess(state, action: PayloadAction<IIngredient>) {
            state.isLoading = false
            state.error = ''
            state.ingredients = [...state.ingredients, action.payload]
        },

        ingredientAddingFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },

        ingredientEditing(state) {
            state.isLoading = true
            state.error = ''        
        },

        ingredientEditingSuccess(state, action: PayloadAction<IIngredient>) {
            state.isLoading = false
            state.error = ''
            const index = state.ingredients.findIndex((item) => item.id === action.payload.id)
            if (index !== -1) {
                state.ingredients[index] = action.payload
            } 
        },

        ingredientEditingFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },

        ingredientDeleting(state) {
            state.isLoading = true
            state.error = ''
        },

        ingredientDeletingSuccess(state, action: PayloadAction<number>) {
            state.isLoading = false
            state.error = ''
            state.ingredients = state.ingredients.filter((item) => item.id !== action.payload)
        },

        ingredientDeletingFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },

    }
})

export default recipesSlice.reducer;