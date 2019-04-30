const apiURL = "http://localhost:3000"
export default {

    getAll: (key) => {
        //.then chain will wait on the return
        //builds url location with the API url / the name of the data set.
        return fetch(`${apiURL}/${key}`)
        //parse response
            .then(response => response.json())
    },

    //access a single item inside a dataset.
    getOne: (key, id) => {
        //builds URL based on APIURL, name of data set and the id of the item requested.
        return fetch(`${apiURL}/${key}/${id}`)
        //parse response.
            .then(response => response.json())
    },

    //adds a new item (object) to a specified data set (key)
    post: (key, object) => {
        return fetch(`${apiURL}/${key}`, {
            //method
            method: "POST",
            //required metadata
            headers: {
                "content-type": "application/json"
            },
            //turns the javascript object into a string that can be read in JSON.
            body: JSON.stringify(object)
        })
    },

    //removes specified item (id) from dataset (key)
    delete: (key, id) => {
        return fetch(`${apiURL}/${key}/${id}`, {
            //method
            method: "DELETE",
        })
    },

    //accesses specified data set (key), and update the specified item (id) with the values of the passed object.
    patch: (key, id, object) => {
        return fetch(`${apiURL}/${key}/${id}`, {
            //method
            method: "PATCH",
            //required metadata.
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(object)
        })
    }
}
