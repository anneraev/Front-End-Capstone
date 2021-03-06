import ApiCall from "../../modules/ApiCall"

const key = "messages"
//gets newState property from ApplicationViews in order to set a property inside it to the contents of the dataset.

export default {
    getAll: () => {
        return ApiCall.getAll(key)
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
    deleteMass: (ids) => {
        return ApiCall.deleteMass(key, ...ids)
    },
    patch: (id, object) => {
        return ApiCall.patch(key, id, object)
    }

}