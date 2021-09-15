import React , {useEffect, useRef, useState} from 'react';
import Layout from '../core/Layout';
import { firestoreInstance, compareUserEmail, createMessage} from './chatApi';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { getUserName } from '../core/apiCore';
import './chat.css';




const Messages = (props) => {
    let user = JSON.parse(localStorage.getItem('jwt')).user;
    const [currentConversation, setCurrentConversation] = useState("");

    const handleConvoSwitch = (newConvoId) => {
        //console.log("new convo: ", newConvoId);
        setCurrentConversation(newConvoId);
        //console.log("new convo state: ", currentConversation);
    };

    useEffect(() => {
        let convid = props.match.params.convoId;
        setCurrentConversation(convid);
    },[])

    return(
        <Layout title="Messages" description="Home page of the website" className="container-fluid">
            <div className="chat-parent">
                <Convos user={user} handleConvoSwitch={handleConvoSwitch} />
                <Chat convoId={currentConversation}/>
            </div>
        </Layout>
    );
}

const Convos = ({handleConvoSwitch}) => {

    const [currentConvo, setCurrentConvo] = useState("");

    const chatSwitcher = (convoId) => {
        return(() => {
            console.log("switched: ", convoId);
            setCurrentConvo(convoId);
            handleConvoSwitch(convoId);
        });
    }

    // useEffect(() => {
    //     console.log("swithed: ", currentConvo);   
    // }, [currentConvo]);

    let user = JSON.parse(localStorage.getItem('jwt')).user;

    const convosRef = firestoreInstance.collection("conversations");
    const query1 = convosRef.where("user1", "==", user._id);
    const query2 = convosRef.where("user2", "==", user._id);
    const [conversations1] = useCollectionData(query1);
    const [conversations2] = useCollectionData(query2);


    return(
        <div className="convos">
            {/* {JSON.stringify(conversations1)} */}
            {/* {JSON.stringify(conversations2)} */}
            
            {conversations1 && conversations1.map((m, i) => {
                return(
                    <ConvoBubble key={i} convo={m} userId={m.user2} convoSwitchHandler={chatSwitcher(m.convoid)}/>
                );
            })}
            {conversations2 && conversations2.map((m, i) => {
                return(
                    <ConvoBubble key={i} convo={m} userId={m.user1} convoSwitchHandler={chatSwitcher(m.convoid)} />
                );
            })}
        </div>
    );
}

const Chat = ({convoId}) => {
    let user = JSON.parse(localStorage.getItem('jwt')).user;

    //console.log("recieved: ", convoId);
    const dummy = useRef();

    const [convoIdState, setConvoIdState] = useState(convoId);//"613f44bf8ff0bb138a604eef6129ad8a0ef192150c5b402e"

    useEffect(()=>{
        //console.log("ran: ", convoId);
        setConvoIdState(convoId);
        dummy.current.scrollIntoView({behaviour: 'smooth'});
    }, [convoId]);

    const messagesRef = firestoreInstance.collection("messages");
    const query = messagesRef.where("convoid", "==", convoIdState).orderBy('createdAt', "asc");
    const [messages] = useCollectionData(query);
    //where("convoid", "==", convoIdState).

    const [inputMsg, setInputMsg] = useState("");

    const handleTextChange = (event) => {
        //console.log(event.target.value);
        setInputMsg(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(inputMsg);
        createMessage({msg: inputMsg, user: user, convoId: convoIdState})
        .then(() => {
            dummy.current.scrollIntoView({behaviour: 'smooth'});
        });
        setInputMsg("");
    };

    return(
        <div className="chat-div">
            <div className="chat-display">
                {/* <MessageBubble styling="msg rec" align=" msg-parent-rec" text="senttttttttttttttttttttttttttttttttttttttt tttttttttttttttttttttttttttttt enttttttttttttttttttttttttttttttttttttttt tttttttttttttttttttttttttttttt enttttttttttttttttttttttttttttttttttttttt tttttttttttttttttttttttttttttt enttttttttttttttttttttttttttttttttttttttt tttttttttttttttttttttttttttttt"/> */}
                {/* <MessageBubble styling="msg sent" align="msg-parent-sent" text="senttttttttttttttttttttttttttttttttttttttt tttttttttttttttttttttttttttttt enttttttttttttttttttttttttttttttttttttttt tttttttttttttttttttttttttttttt enttttttttttttttttttttttttttttttttttttttt tttttttttttttttttttttttttttttt enttttttttttttttttttttttttttttttttttttttt tttttttttttttttttttttttttttttt"/> */}
                {messages && messages.map((m, i) => {
                    if(m.sender === user._id){
                        return(
                            <MessageBubble key={i} styling="msg sent" align="msg-parent-sent" text={m.text} />
                        );
                    } else {
                        return(
                            <MessageBubble key={i} styling="msg rec" align="msg-parent-rec" text={m.text} />
                        );
                    }
                    
                })}
                <div ref={dummy}></div>
                {/* {console.log("rendered: ", convoIdState)} */}
            </div>
            <MessageForm textHandler={handleTextChange} textSubmit={handleSubmit} value={inputMsg}/>
        </div>
    );
}

const MessageBubble = ({text, styling, align}) => {
    return(
        <div className={`msg-parent ${align}`}>
            <div className={styling}>
                {text}
            </div>
        </div>
    );
}

const MessageForm = ({textHandler, textSubmit, value}) => {
    return(
        <form className="message-form mb-4" onSubmit={textSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <input type="search" minLength="1" className="form-control" onChange={textHandler} value={value} placeholder="Search"/>
                </div>
                <div className="btn input-group-append" style={{border: 'none'}}>
                    <button className="input-group-text" >Send</button>
                </div>
            </span>
        </form>
    );
};

const ConvoBubble = ({userId, convo, convoSwitchHandler}) => {

    //const userName = "abcd"; //getUserName({user_id: userId})

    const [userName, setUserName] = useState("");

    useEffect(() => {
        getUserName({user_id: userId})
        .then(data => {
            //console.log("ran: ", data);
            setUserName(data.name)
        });
    }, []);

    return(
        <div className="convo-bubble" onClick={() => convoSwitchHandler()}>
                {userName}
        </div>
    );
}

export default Messages;