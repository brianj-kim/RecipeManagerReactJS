import React, { useState, useEffect } from 'react';
import RecipeDataService from "../services/RecipeService";
import IngredientDataService from "../services/IngredientService";

const RecipeIngredients = props => {
    // Set up for current recipe data
    const [recipeId, setRecipeId] = useState(props.match.params.id);
    const initialRecipeState = {
        id: null,
        name: "",
        category: "",
        description: ""
    };

    const [recipe, setRecipe] = useState(initialRecipeState);    
    
    const getRecipe = id => {
        RecipeDataService.get(id)
            .then(res => {
                setRecipe(res.data);
                // console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getRecipe(recipeId);
    }, [recipeId]);


    // Ingredient(s) List
    const initialIngredientState = {
        id: null,
        ingredient: "",        
        quantity: 0.0,
        unit: "",
        unitPrice: 0.0,
        loss: 0.0,
        portionPrice: 0.0,
        description: ""
    };

    const [ingredients, setIngredients] = useState([]);
    const [currentIngredient, setCurrentIngredient] = useState(initialIngredientState);
    const [currentIndex, setCurrentIndex] = useState(-1);    

    const retrieveIngredients = rid => {
        IngredientDataService.getAll(rid)
            .then(res => {
                setIngredients(res.data);
                // console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = rid => {
        retrieveIngredients(rid);
        setCurrentIngredient(initialIngredientState);
        setCurrentIndex(-1);
    };

    useEffect(() => {
        retrieveIngredients(recipeId);
    }, [recipeId]);


    // Add new ingredient with modal functionality
    const [modalHeader, setModalHeader] = useState("Add New Ingredient");
    const [showAddIngredient, setShowAddIngredient] = useState(false);
    const [newIngredient, setNewIngredient] = useState(initialIngredientState);

    const openNewIngredientModal = () => {
        setModalHeader("Add New Ingredient");
        setShowAddIngredient(true);
    }

    const handleInputChange = e => {        
        const { name, value } = e.target;
        setNewIngredient({...newIngredient, [name]: value });        
    };

    // auto calculation for portionPrice of quantity multiplied by unitPrice
    const getPortionPrice = () => {
        const target = document.querySelector("#portionPrice");
        let tmpCalc = (document.querySelector("#quantity").value * document.querySelector("#unitPrice").value);
        target.value = tmpCalc; 
        setNewIngredient({ ...newIngredient, portionPrice: tmpCalc});
    }

    const closeAddIngredientModal = () => {
        setShowAddIngredient(false);        
        setNewIngredient(initialIngredientState);
    }

    const saveIngredient = rid => {
        var data = {
            ingredient: newIngredient.ingredient,        
            quantity: newIngredient.quantity,
            unit: newIngredient.unit,
            unitPrice: newIngredient.unitPrice,
            loss: newIngredient.loss,
            portionPrice: newIngredient.portionPrice,
            description: newIngredient.description
        };

        IngredientDataService.create(rid, data)
            .then(res => {
                setNewIngredient({
                    id: res.data.id,
                    ingredient: res.data.ingredient,
                    quantity: res.data.quantiry,
                    unit: res.data.unit,
                    unitPrice: res.data.unitPrice,
                    loss: res.data.loss,
                    portionPrice: res.data.portionPrice,
                    description: res.data.description
                });
                
                setShowAddIngredient(false);
                refreshList(rid);
                // console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    };


    // Update Ingredient with recipe id and ingredient id
    const editIngredient = iid => {
        var tmpIngredient = ingredients.find(({ id }) => id === iid);
        setNewIngredient(tmpIngredient);
        setModalHeader("Edit Ingredient");
        setShowAddIngredient(true);
    }

    const updateIngredient = (rid, iid) => {
        var data = {
            ingredient: newIngredient.ingredient,        
            quantity: newIngredient.quantity,
            unit: newIngredient.unit,
            unitPrice: newIngredient.unitPrice,
            loss: newIngredient.loss,
            portionPrice: newIngredient.portionPrice,
            description: newIngredient.description
        };
        
        IngredientDataService.update(rid, iid, data)
            .then(res => {
                setNewIngredient({
                    id: res.data.id,
                    ingredient: res.data.ingredient,
                    quantity: res.data.quantiry,
                    unit: res.data.unit,
                    unitPrice: res.data.unitPrice,
                    loss: res.data.loss,
                    portionPrice: res.data.portionPrice,
                    description: res.data.description
                });

                setShowAddIngredient(false);
                refreshList(rid);
                // console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            })

    }

    const saveConfirm = () => {
        // console.log(newIngredient);
        if(newIngredient.id == null) {
            saveIngredient(recipeId);
        } else {
            updateIngredient(recipeId, newIngredient.id);
        }
    }

    const removeIngredient = iid => {
        IngredientDataService.remove(recipeId, iid)
            .then(res => {
                // console.log(res.data);
                refreshList(recipeId);
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div className="container mx-auto overflow-hidden sm:rounded-lg">
            <div className="px-5 py-4">
                <span className="font-aleo-header text-2xl font-semibold text-purple-700">{recipe.name} </span>
                <p>Category / {recipe.category}</p>
                <p>Description / {recipe.description}</p>
                
                <div className="flex justify-between items-center">
                    <div className="pt-6 ">
                        <span className="font-aleo-header text-lg font-bold text-purple-700">
                            Ingredients
                        </span>
                    </div>
                    <div className="pt-6 pb-3">
                        <button
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            onClick={openNewIngredientModal}
                        >
                            Add Ingredient
                        </button>
                        
                        {showAddIngredient ? (
                            /* ModalBlock : begin */
                            <>
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                >
                                    <div className="relative lg:w-5/12 sm:w-8/12 my-6 mx-auto max-w-3xl">
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                                            
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                                <h3 className="text-2xl text-purple-700 font-bold">
                                                    {modalHeader}
                                                </h3>
                                                <button
                                                    className="p-1 ml-auto bg-transparent border-0 text-purple-700 opacity-60 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                    onClick={closeAddIngredientModal}
                                                >
                                                    <span className="h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    ×
                                                    </span>
                                                </button>
                                            </div>
                                            {/*body*/}
                                            <div className="w-full relative p-6 flex-auto">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <div className=" col-span-6">
                                                        <label htmlFor="ingredient" className="block text-sm font-medium text-gray-700">
                                                            Ingredient Name
                                                        </label>
                                                        <input
                                                        type="text"
                                                        name="ingredient"
                                                        id="ingredient"
                                                        className="w-full mt-1 focus:ring-purple-500 focus:border-purple-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        required 
                                                        value={newIngredient.ingredient || ''} 
                                                        onChange={handleInputChange}
                                                        />
                                                    </div>

                                                    <div className="col-span-6">
                                                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                                            Quantity
                                                        </label>
                                                        <input
                                                        type="text"
                                                        name="quantity"
                                                        id="quantity"
                                                        className="w-full mt-1 focus:ring-purple-500 focus:border-purple-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        value={newIngredient.quantity || 0} 
                                                        onChange={handleInputChange}
                                                        onBlur={getPortionPrice}
                                                        />
                                                    </div>

                                                    <div className="col-span-6">
                                                        <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                                                            Unit
                                                        </label>
                                                        <input
                                                        type="text"
                                                        name="unit"
                                                        id="unit"
                                                        className="w-full mt-1 focus:ring-purple-500 focus:border-purple-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        value={newIngredient.unit || ''} 
                                                        onChange={handleInputChange}
                                                        />
                                                    </div>

                                                    <div className="col-span-6">
                                                        <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">
                                                            Unit Price
                                                        </label>
                                                        <input
                                                        type="text"
                                                        name="unitPrice"
                                                        id="unitPrice"
                                                        className="w-full mt-1 focus:ring-purple-500 focus:border-purple-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        value={newIngredient.unitPrice || 0} 
                                                        onChange={handleInputChange}
                                                        onBlur={getPortionPrice}
                                                        />
                                                    </div>

                                                    <div className="col-span-6">
                                                        <label htmlFor="loss" className="block text-sm font-medium text-gray-700">
                                                            Loss(%)
                                                        </label>
                                                        <input
                                                        type="text"
                                                        name="loss"
                                                        id="loss"
                                                        className="w-full mt-1 focus:ring-purple-500 focus:border-purple-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        value={newIngredient.loss || 0} 
                                                        onChange={handleInputChange}
                                                        />
                                                    </div>

                                                    <div className="col-span-6">
                                                        <label htmlFor="portinPrice" className="block text-sm font-medium text-gray-700">
                                                            Portion Price
                                                        </label>
                                                        <input
                                                        type="text"
                                                        name="portionPrice"
                                                        id="portionPrice"
                                                        className="w-full mt-1 focus:ring-purple-500 focus:border-purple-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        readOnly
                                                        value={newIngredient.portionPrice || 0} 
                                                        onChange={handleInputChange}
                                                        />
                                                    </div>

                                                    <div className="col-span-6">
                                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                            Description
                                                        </label>
                                                        <input
                                                        type="text"
                                                        name="description"
                                                        id="description"
                                                        className="w-full mt-1 focus:ring-purple-500 focus:border-purple-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        value={newIngredient.description || ''} 
                                                        onChange={handleInputChange}
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                            {/*footer*/}
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                <button
                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={closeAddIngredientModal}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={saveConfirm}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                            /* ModalBlock : begin */
                        ) : null}
                    
                    </div>                    
                </div>
                
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-x-auto">

                <table className="min-w-full divide-y divide-gray-200 border-b">
                    <thead className="bg-gray-50">
                        <tr>
                        <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Ingredient
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Quantity
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Unit
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Unit Price
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Loss(%)
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Portion Price
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Description
                            </th>
                            
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 ">
                    {ingredients && ingredients.map((ingredient, recipeId) => (
                        <tr key={ingredient.id} >                            
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{ingredient.ingredient}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{ingredient.quantity}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{ingredient.unit}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(ingredient.unitPrice)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{ingredient.loss}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(ingredient.portionPrice)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{ingredient.description}</div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <span 
                                    onClick={() => removeIngredient(ingredient.id)}
                                    className="pr-4 text-purple-600 hover:text-purple-900 cursor-pointer"
                                >
                                    Remove
                                </span>

                                <span
                                    onClick={() => editIngredient(ingredient.id)}
                                    className="text-purple-600 hover:text-purple-900 cursor-pointer"
                                >
                                    Edit
                                </span>                       
                            </td>
                        </tr>
                    )) } 
                    
                    </tbody>
                </table>

                        </div>
                    </div>    
                </div>

            </div>
        </div>                
        
    )
}

export default RecipeIngredients;