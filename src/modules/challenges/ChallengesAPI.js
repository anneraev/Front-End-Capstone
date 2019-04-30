import ApiCall from "../ApiCall"
import StateManager from "../StateManager";

const key = "challenges"
const newState = StateManager.newState


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