import http from '../http-common';

const getAll = () => {
    return http.get("/recipes");
};

const get = id => {
    return http.get(`/recipes/${id}`);
};

const create = data => {
    return http.post("/recipes", data);
};

const update = (id, data) => {
    return http.put(`/recipes/${id}`, data);
};

const updateCostTotal = (id, cost) => {
    return http.put(`/recipe/${id}/costs/${cost}`);
}

const updateIngredientsCounts = (id, counts) => {
    return http.put(`/recipe/${id}/counts/${counts}`);
}

const remove = id => {
    return http.delete(`/recipes/${id}`);
}

const findByName = recipeName => {
    return http.get(`/recipes?name=${recipeName}`);
};

const RecipeService = {
    getAll,
    get,
    create,
    update,
    updateCostTotal,
    updateIngredientsCounts,
    remove,
    findByName
}

export default RecipeService;