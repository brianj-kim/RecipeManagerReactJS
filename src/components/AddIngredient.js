import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AddIngredient = props => {
    const recipeId = props.match.params.id;
    
    return (
        <div className="container mx-auto shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="px-5 py-4">
                Add Form for Ingredient(s) with recipe id of {props.match.params.id}
            </div>
            <div className="px-5 pt-6 pb-2">
                <Link
                    to={"/recipe-ingredients/" + recipeId}
                >
                    Back
                </Link>
            </div>
        </div>
    );
}

export default AddIngredient;