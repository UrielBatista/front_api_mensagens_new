import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import PostMessages from "./components/PostMessages";
import { store } from "./actions/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, AppBar } from "@material-ui/core";
import ButterToast,{ POS_RIGHT,POS_TOP } from "butter-toast";

function App() {
  
  return (
  <div className="postMessages">    
  <Provider store={store}>
    <Container maxWidth="lg">
      <AppBar position="static">
        <div className="TituloApp">
          <h1 className="msgOdio">
            Chat realtime - v1.0
                  Web
          </h1>
        </div>
      </AppBar>
      <PostMessages />
     <ButterToast position={{vertical:POS_TOP,horizontal: POS_RIGHT}}/>
    </Container>
    
</Provider>

</div>

 

  );
  
}

export default App;
