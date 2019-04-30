import UsersAPI from "../users/UsersAPI"
import MessagesAPI from "../messages/MessagesAPI"
import ChallengesAPI from "../challenges/ChallengesAPI"
import CheckInsAPI from "../checkIns/CheckInsAPI"
import StateManager from "../StateManager";

export default {
    updateStateFromAPI: () => {
        UsersAPI.getAll()
        .then(() => MessagesAPI.getAll())
        .then(() => ChallengesAPI.getAll())
        .then(() => CheckInsAPI.getAll())
        .then(() => StateManager.setState(StateManager.newState))
    }
}