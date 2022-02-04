import http from '../http-common';

const getAll = rid => {
    return http.get(`/recipes/${rid}/ingredients`);
};

const get = (rid, iid) => {
    return http.get(`/recipes/${rid}/ingredients/${iid}`);
};

const create = (rid, data) => {
    return http.post(`/recipes/${rid}/ingredients`, data);
};

const update = (rid, iid, data) => {
    return http.put(`/recipes/${rid}/ingredients/${iid}`, data);
};

const remove = (rid, iid) => {
    return http.delete(`/recipes/${rid}/ingredients/${iid}`);
}

const IngredientService = {
    getAll,
    get,
    create,
    update,
    remove
}

export default IngredientService;