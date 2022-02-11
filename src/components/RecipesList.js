import React, { useState, useEffect } from 'react';
import RecipeDataService from '../services/RecipeService';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from '@fortawesome/free-solid-svg-icons';

const RecipesList = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrieveRecipes()
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    }

    const retrieveRecipes = () => {
        RecipeDataService.getAll()
            .then(res => {
                setRecipes(res.data);
                // console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveRecipes();
    };

    const removeRecipe = id => {
        RecipeDataService.remove(id)
            .then(res => {
                // console.log(res.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            })
    }

    const findByName = () => {
        RecipeDataService.findByName(searchName)
            .then(res => {
                setRecipes(res.data);
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="container mx-auto  shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            colSpan="2"
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Recipe
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Category
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Ingredients
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Cost
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Revenue
                        </th>                        
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {recipes &&
                    recipes.map((recipe, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                        <td className="pl-6 pr-1 py-4 whitespace-nowrap">
                        <FontAwesomeIcon icon={faImage} />
                        </td>
                        <td className="pl-1 pr-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                                <Link
                                    to={"/recipe-ingredients/" + recipe.id}
                                    className="hover:underline"
                                >
                                    {recipe.name}
                                </Link>
                                
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{recipe.category}</div>
                        </td>                        
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{recipe.ingredientCount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(recipe.costTotal)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(recipe.revenue)}</div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <span className="pr-4">
                                <Link
                                    to={"/recipes"}
                                    onClick={() => removeRecipe(recipe.id)}
                                    className="text-purple-600 hover:text-purple-900"
                                >
                                    Remove
                                </Link>
                            </span>

                            <span className="">
                                <Link
                                    to={"/recipes/" + recipe.id}
                                    className="text-purple-600 hover:text-purple-900"
                                >
                                    Edit
                                </Link>     
                            </span>                       
                        </td>
                    </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}

export default RecipesList;