import React, { useState, useEffect } from 'react';
import RecipeDataService from "../services/RecipeService";

const Recipe = props => {
    const initialRecipeState = {
        id: null,
        name: "",
        category: "",
        description: ""
    };

    const [currentRecipe, setCurrentRecipe] = useState(initialRecipeState);
    const [message, setMessage] = useState("");

    const getRecipe = id => {
        RecipeDataService.get(id)
            .then(res => {
                setCurrentRecipe(res.data);
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getRecipe(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = e => {
        const {name, value} = e.target;
        setCurrentRecipe({ ...currentRecipe, [name]: value });
    };

    const updateRecipe = () => {
        RecipeDataService.update(currentRecipe.id, currentRecipe)
            .then(res => {
                console.log(res.data);
                setMessage("The recipe was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            })
    }

    const deleteRecipe = () => {
        RecipeDataService.remove(currentRecipe.id)
            .then(res => {
                console.log(res.data);
                props.history.push("/recipes");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <>   
        <div className="relative flex flex-wrap items-center justify-between px-16 py-3 mb-3">
            <div className="container w-9/12 mx-auto shadow overflow-hidden items-center justify-between sm:rounded-md">                
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                            <h2 className="font-aleo-header">Recipe Details</h2>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Recipe Name
                            </label>
                            <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                            required 
                            value={currentRecipe.name || ''} 
                            onChange={handleInputChange}
                            />
                        </div>

                        <div className="col-span-6  sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <input
                            type="text"
                            name="category"
                            id="category"
                            className="w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={currentRecipe.category || ''} 
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
                            className="w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={currentRecipe.description || ''} 
                            onChange={handleInputChange}
                            />
                        </div>                    
                    </div>
                </div>
                <div className="w-full px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <span className="pr-3">
                        <button 
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-200"
                            onClick={deleteRecipe}
                        >
                            Delete
                        </button>
                    </span>

                    <span className="">
                    <button
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={updateRecipe}
                    >
                        Update
                    </button>
                    </span>

                    <p>{message}</p>

                </div>
                    
            </div>
        </div>
        </> 
    )
}

export default Recipe;