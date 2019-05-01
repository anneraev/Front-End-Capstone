import UsersAPI from "./users/UsersAPI"
import MessagesAPI from "./messages/MessagesAPI"
import ChallengesAPI from "./challenges/ChallengesAPI"
import CheckInsAPI from "./check_ins/CheckInsAPI"

export default {
    //calls a function for each datatype to get get data from the API,and add it to newState in stateManager so that setstate callback funciton will run after.
    updateStateFromAPI: () => {
        return UsersAPI.getAll()
        .then(() => MessagesAPI.getAll())
        .then(() => ChallengesAPI.getAll())
        .then(() => CheckInsAPI.getAll())
    }
}