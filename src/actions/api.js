import axios from "axios"

const baseUrl = 'http://192.168.0.10:4000/'

export default {
    postMessage(url = baseUrl + 'postmessages/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id,),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }
}