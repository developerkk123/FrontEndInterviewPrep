import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const ChatRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, "rooms", roomId, "messages"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !username) return;

    await addDoc(collection(db, "rooms", roomId, "messages"), {
      text: input,
      username,
      createdAt: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div style={styles.container}>
      <h2>Room ID: {roomId}</h2>

      {!username && (
        <input
          placeholder="Enter your name"
          onBlur={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      )}

      <div style={styles.chatBox}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              ...styles.message,
              alignSelf: msg.username === username ? "flex-end" : "flex-start",
              backgroundColor:
                msg.username === username ? "#4CAF50" : "#e5e5ea",
            }}
          >
            <strong>{msg.username}</strong>
            <div>{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputContainer}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendBtn}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "500px", margin: "40px auto" },
  chatBox: {
    height: "350px",
    overflowY: "auto",
    border: "1px solid #ddd",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
  },
  message: {
    padding: "8px",
    borderRadius: "8px",
    marginBottom: "6px",
    maxWidth: "70%",
  },
  inputContainer: { display: "flex", marginTop: "10px" },
  input: { flex: 1, padding: "8px" },
  sendBtn: { marginLeft: "10px", padding: "8px 12px" },
};

export default ChatRoom;
