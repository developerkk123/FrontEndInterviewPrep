import React, { useEffect, useState, useRef } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("User A");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: input,
      username,
      createdAt: serverTimestamp(),
      uid: auth.currentUser?.uid,
    });

    setInput("");
  };

  return (
    <div style={styles.container}>
      <h2>🔥 Firebase Real-Time Chat</h2>

      {/* Username Switch */}
      <div style={styles.userSwitch}>
        <button
          onClick={() => setUsername("User A")}
          style={username === "User A" ? styles.activeBtn : styles.btn}
        >
          User A
        </button>
        <button
          onClick={() => setUsername("User B")}
          style={username === "User B" ? styles.activeBtn : styles.btn}
        >
          User B
        </button>
      </div>

      {/* Chat Box */}
      <div style={styles.chatBox}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              ...styles.message,
              alignSelf: msg.username === username ? "flex-end" : "flex-start",
              backgroundColor:
                msg.username === username ? "#4CAF50" : "#e5e5ea",
              color: msg.username === username ? "white" : "black",
            }}
          >
            <strong>{msg.username}</strong>
            <div>{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={styles.inputContainer}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.sendBtn}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    fontFamily: "Arial",
  },
  userSwitch: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  btn: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    background: "#f5f5f5",
    cursor: "pointer",
  },
  activeBtn: {
    padding: "8px 12px",
    border: "1px solid #4CAF50",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    height: "350px",
    overflowY: "auto",
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px",
    background: "#fafafa",
  },
  message: {
    maxWidth: "70%",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "8px",
    display: "flex",
    flexDirection: "column",
  },
  inputContainer: {
    display: "flex",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  sendBtn: {
    marginLeft: "10px",
    padding: "10px 15px",
    border: "none",
    background: "#4CAF50",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ChatApp;
