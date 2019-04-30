import ApiCall from "../api/ApiCall"
import ApplicationViews from "../../ApplicationViews";

const key = "users"
const newState = ApplicationViews.prototype.newState;

export default {
    getAll: () => {
        ApiCall.getAll(key).then(users => newState.users = users);
    },
    getOne: (id) => {
        ApiCall.getOne(key, id)
    },
    post: (object) => {
        ApiCall.post(key, object)
    },
    delete: (id) => {
        ApiCall.delete(key, id)
    },
    patch: (id, object) => {
        ApiCall.patch(key, id, object)
    }

}