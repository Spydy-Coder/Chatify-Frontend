import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import "./ChatContainer.css";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";

export default function ChatContainer({ currentChat, socket, handleBack }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id, 
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container-fluid " style={{ height: "100%" }}>
      <div
        className="chat-header d-flex justify-content-between py-2 "
        style={{ height: "10%" }}
      >
        <div className="user-details d-flex gap-1 gap-sm-3"style={{width:"90%"}}>
          <IoArrowBackCircleSharp
            className="back"
            onClick={handleBack}
            size={40}
            color="#9a86f3"
          />
          <div className="avatarimg">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
              className="avatarimg"
            />
          </div>
          <div className="username text-white  d-flex flex-column ">
            <h4 className="mb-0 text-wrap">{currentChat.username} </h4>
            <h6><small>{currentChat.status === "online" ? <GoDotFill color="green" /> : <GoDotFill color="red" />}{currentChat.status}</small></h6>
          </div>
        </div>
        <div className="d-flex justify-content-center py-1" style={{width:"10%"}}>
          <Logout />
        </div>
      </div>
      <div
        className="chat-messages"
        style={{ height: "80%", overflowY: "auto" }}
      >
        <ul className="list-group list-unstyled ">
          {messages.map((message) => {
            return (
              <li ref={scrollRef} key={uuidv4()} className="me-2 mb-2">
                <div
                  className={`message ${
                    message.fromSelf ? "sended" : "recieved"
                  }`}
                >
                  <div className="content px-2 py-1 rounded">
                    <p className="m-0">{message.message}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div style={{ height: "10%" }} className="d-flex align-items-center">
        <ChatInput className="w-100" handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
}

// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 10% 80% 10%;
//   gap: 0.1rem;
//   overflow: hidden;
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     grid-template-rows: 15% 70% 15%;
//   }
//   .chat-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 0 2rem;
//     .user-details {
//       display: flex;
//       align-items: center;
//       gap: 1rem;
//       .avatar {
//         img {
//           height: 3rem;
//         }
//       }
//       .username {
//         h3 {
//           color: white;
//         }
//       }
//     }
//   }
// .chat-messages {
//   padding: 1rem 2rem;
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   overflow: auto;
//   &::-webkit-scrollbar {
//     width: 0.2rem;
//     &-thumb {
//       background-color: #ffffff39;
//       width: 0.1rem;
//       border-radius: 1rem;
//     }
//   }
//   .message {
//     display: flex;
//     align-items: center;
//     .content {
//       max-width: 40%;
//       overflow-wrap: break-word;
//       padding: 1rem;
//       font-size: 1.1rem;
//       border-radius: 1rem;
//       color: #d1d1d1;
//       @media screen and (min-width: 720px) and (max-width: 1080px) {
//         max-width: 70%;
//       }
//     }
//   }
//   .sended {
//     justify-content: flex-end;
//     .content {
//       background-color: #4f04ff21;
//     }
//   }
//   .recieved {
//     justify-content: flex-start;
//     .content {
//       background-color: #9900ff20;
//     }
//   }
// }
// `;
