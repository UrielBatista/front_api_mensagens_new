import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/postMessage";
import { Grid, Paper, withStyles, List, ListItem, ListItemText, Typography, Divider, Button } from "@material-ui/core";
import PostMessageForm from "./PostMessageForm";
import ButterToast, { Cinnamon } from "butter-toast";
import { DeleteSweep } from "@material-ui/icons";
import Swal from 'sweetalert2';

import './styles.css';

const styles = theme => ({
    paper: {
        margin: theme.spacing(3),//3 
        padding: theme.spacing(10),//2 10

    },
    smMargin: {
        margin: theme.spacing(1)
    },
    actionDiv: {
        textAlign: "center"
    }
})

const PostMessages = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)


    useEffect(() => {
        props.fetchAllPostMessages()
    }, [props])

    const onDelete = id => {
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Caixa de Mensagem"
                    content="Deletado com sucesso!"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<DeleteSweep />}
                />
            })
        }
        // NOVO MÉTODO PARA CONFIRMACAO QUE OS DADOS FORAM DELETADOS
        Swal.fire({
            title: "Voce tem certeza em deletar sua menssagem?",
            icon: "question",
            showCloseButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                props.deletePostMessage(id, onSuccess)
            }
        })
        // CONFIRMACAO DO WINDOWS AO DELETAR OS DADOS.
        // if (window.confirm('Voce tem certeza em deletar sua menssagem?'))
        //     props.deletePostMessage(id,onSuccess)
    }

    return (
        <div >
            <Grid container>
                <Grid item xs={12}>{/*7 || 12*/}
                    {/* className={classes.paper} */}
                    <Paper className="lista-messages">
                        <List>
                            
                            {
                                
                                props.postMessageList.map((record, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <ListItem>
                                                <ListItemText>
                                                    <Typography variant="h5">
                                                        {record.title}
                                                    </Typography>
                                                    <div className="grid-metodo">
                                                        {record.message}
                                                    </div>
                                                    {/* <div className={classes.actionDiv}>
                                                        <Button variant="contained" color="primary" size="small"
                                                            className={classes.smMargin}
                                                            onClick={() => setCurrentId(record._id)}>
                                                            Editar
                                                    </Button>
                                                        <Button variant="contained" color="secondary" size="small"
                                                            className={classes.smMargin}
                                                            onClick={() => onDelete(record._id)}>
                                                            Deletar
                                                    </Button>
                                                    </div> */}
                                                </ListItemText>
                                            </ListItem>
                                            <Divider component="li" />
                                        </Fragment>
                                    )
                                })
                            }

                        </List>

                    </Paper>

                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <PostMessageForm {...{ currentId, setCurrentId }} />
                    </Paper>
                </Grid>
            </Grid>
            <br/>
            <br/>
        </div>
    );

}

const mapStateToProps = state => ({
    postMessageList: state.postMessage.list
})

const mapActionToProps = {
    fetchAllPostMessages: actions.fetchAll, 
    deletePostMessage: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostMessages));
