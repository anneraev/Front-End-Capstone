import ApiCall from "../api/ApiCall"
import ApplicationViews from "../../ApplicationViews";

const key = "challenges"
//gets newState property from ApplicationViews in order to set a property inside it to the contents of the dataset.
const newState = ApplicationViews.prototype.newState;


export default {
    getAll: () => {
        ApiCall.getAll(key).then(challenges => newState.challenges = challenges)
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