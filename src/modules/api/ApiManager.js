import UsersAPI from "../users/UsersAPI"
import MessagesAPI from "../messages/MessagesAPI"
import ChallengesAPI from "../challenges/ChallengesAPI"
import CheckInsAPI from "../checkIns/CheckInsAPI"

export default {
    updateStateFromAPI: () => {
        return UsersAPI.getAll()
        .then(() => MessagesAPI.getAll())
        .then(() => ChallengesAPI.getAll())
        .then(() => CheckInsAPI.getAll())
    }
}