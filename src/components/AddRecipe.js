import React, { useState } from 'react';
import RecipeDataSeervice from "../services/RecipeService";

const AddRecipe = () => {
    const initialRecipeState = {
        id: null,
        category: "",
        name: "",
        description: ""
    };

    const [recipe, setRecipe] = useState(initialRecipeState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setRecipe({...recipe, [name]: value });
    };

    const saveRecipe = () => {
        var data = {
            name: recipe.name,
            category: recipe.category,
            description: recipe.description
        };

        RecipeDataSeervice.create(data)
            .then(res => {
                setRecipe({
                    id: res.data.id,
                    name: res.data.name,
                    category: res.data.category,
                    description: res.data.description
                });
                
                setSubmitted(true);
                // console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newRecipe = () => {
        setRecipe(initialRecipeState);
        setSubmitted(false);
    };

    return (
        <div className="relative flex flex-wrap items-center justify-between px-16 py-3 mb-3">
            <div className="container w-9/12 mx-auto shadow overflow-hidden items-center justify-between sm:rounded-md">            
                {submitted ? (
                <>
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                            You submitted successfully!                    
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button                    
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        onClick={newRecipe}
                        >
                        Add
                        </button>
                    </div>                
                </>
                ) : (
                <>
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Recipe Name
                                </label>
                                <input
                                type="text"
                                name="name"
                                id="name"
                                className="w-full mt-1 focus:ring-purple-500 focus:border-purple-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                                required 
                                value={recipe.name || ''} 
                                onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <input
                                type="text"
                                name="category"
                                id="category"
                                className="w-full mt-1 focus:ring-purple-500 focus:border-purple-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                                value={recipe.category || ''} 
                                onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <input
                                type="text"
                                name="description"
                                id="description"
                                className="w-full mt-1 focus:ring-purple-500 focus:border-purple-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                                value={recipe.description || ''} 
                                onChange={handleInputChange}
                                />
                            </div>                    
                        </div>
                    </div>
                    <div className="w-full px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                        onClick={saveRecipe}                    
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                        Save
                        </button>
                    </div>
                </>
                )}                        
            </div>
        </div>
    );
};

export default AddRecipe;