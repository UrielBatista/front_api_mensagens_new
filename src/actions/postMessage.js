import api from "./api.js";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}
//buscando dados
export const fetchAll = () => dispatch => {
    function scroll(){
        let x = document.getElementsByClassName('MuiPaper-root lista-messages MuiPaper-elevation1 MuiPaper-rounded')[0];
        x.scrollTo(1, 10000000)
    }
    api.postMessage().fetchAll()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: res.data
            })
            scroll()
            
        })
        .catch(err => console.log(err))

}
//inserindo dados
export const create = (data, onSuccess) => dispatch => {
    
    api.postMessage().create(data)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
           
            onSuccess()
        })
        .catch(err => console.log(err))
}
//atualisando dados
export const update = (id,data, onSuccess) => dispatch => {
    api.postMessage().update(id,data)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
//deletando dados
export const Delete = (id, onSuccess) => dispatch => {
    api.postMessage().delete(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}