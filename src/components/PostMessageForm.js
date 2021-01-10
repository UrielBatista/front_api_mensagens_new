import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core";
import { Button } from "react-bootstrap";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/postMessage";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";
import TextField from '@material-ui/core/TextField';

import './styles.css';


const initialFieldValues = {
    title: '',
    message: ''
}

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
        },
      
    },
    form: {
        width: '50h',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // marginLeft: '-9.3ch '
        
    },
    postBtn: {
        width: "100%",
        flexWrap: 'wrap',
        justifyContent: 'center'
        
    }
})

const PostMessageForm = ({ classes, ...props }) => {

    useEffect(() => {
        if (props.currentId != 0){
            setValues({
                ...props.postMessageList.find(x => x._id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    const validate = () => {
        let temp = { ...errors }
        temp.title = values.title ? "" : "Não existe nada escrito."
        temp.message = values.message ? "" : "Não existe nada escrito."
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues,props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Caixa de Mensagem"
                    content="Enviado com sucesso!"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                />
            })
            resetForm()
        }
        if (validate()) {
            if (props.currentId == 0)
                props.createPostMessage(values, onSuccess)
            else
                props.updatePostMessage(props.currentId, values, onSuccess)
        }
    }
    
    return (
        
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}>
                <TextField 
                    name="title"
                    variant="outlined"
                    label="Nome"
                    fullWidth
                    value={values.title}
                    onChange={handleInputChange}
                    {...(errors.title && { error: true, helperText: errors.title })}
                />
                
                <TextField
                    name="message"
                    variant="outlined"
                    label="Mensagem"
                    fullWidth
                    multiline
                    rows={4}
                    value={values.message}
                    onChange={handleInputChange}
                    {...(errors.message && { error: true, helperText: errors.message })}
                />
                <p/>
                <Button
                    variant="dark"
                    color="secondary"
                    size="large"
                    type="submit"
                    className={classes.postBtn}
                >Enviar</Button>
        </form>
        
    );
}

const mapStateToProps = state => ({
    postMessageList: state.postMessage.list
})

const mapActionToProps = {
    createPostMessage: actions.create,
    updatePostMessage: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostMessageForm));
// withStyles(styles)