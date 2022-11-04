import React from 'react';
import db from '../model/firebase';
import { collection, addDoc,setDoc,doc } from "firebase/firestore";


// it is just a test!!

function Chat() {
const addChat = () => {
const chatName = prompt('Please enter the chat room name');

if (chatName) {
const cityRef = doc(db, 'cities', 'BJ');
setDoc(cityRef, { name: chatName }, { merge: true });
}
};

return <button onClick={addChat}> Click me </button>;
}



export default Chat;