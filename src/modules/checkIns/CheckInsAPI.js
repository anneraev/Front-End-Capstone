import ApiCall from "../api/ApiCall"
import StateManager from "../StateManager";

const key = "checkIns"
const newState = StateManager.newState

export default {
    getAll: () => {
        ApiCall.getAll(key).then(checkIns => newState.checkIns = checkIns)
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