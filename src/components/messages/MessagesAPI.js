import ApiCall from "../../modules/ApiCall"
import stateManager from "../stateManager";

const key = "messages"
//gets newState property from ApplicationViews in order to set a property inside it to the contents of the dataset.
const newState = stateManager.newState

export default {
    getAll: () => {
        return ApiCall.getAll(key).then(messages => newState.messages = messages)
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