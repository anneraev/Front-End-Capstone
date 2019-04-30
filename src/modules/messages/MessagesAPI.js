import ApiCall from "../ApiCall"
import StateManager from "../StateManager";

const key = "messages"
const newState = StateManager.newState

export default {
    getAll: () => {
        ApiCall.getAll(key).then(messages => newState.messages = messages)
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