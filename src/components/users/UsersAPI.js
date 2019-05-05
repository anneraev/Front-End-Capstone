import ApiCall from "../../modules/ApiCall"
import stateManager from "../stateManager";

const key = "users"
//gets newState property from ApplicationViews in order to set a property inside it to the contents of the dataset.
const newState = stateManager.newState;

export default {
    getAll: () => {
        return ApiCall.getAll(key).then(users => newState.users = users);
    },
    getOne: (id) => {
        return ApiCall.getOne(key, id)
    },
    post: (object) => {
        return ApiCall.post(key, object)
    },
    delete: (id) => {
        return ApiCall.delete(key, id)
    },
    patch: (id, object) => {
        return ApiCall.patch(key, id, object)
    }

}