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
    remove,
    findByName
}

export default RecipeService;