import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import "./Contacts.css";
import Logout from "./Logout";
import { GoDotFill } from "react-icons/go";
import { RiRobot2Fill } from "react-icons/ri";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const predefinedContact = {
    email: "buddy@openai.com",
    username: "Buddy",
    avatarImage: "https://example.com/predefined-avatar.jpg",
    _id: "65c0d419508086996680d56a",
    status: "online",
  };
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <div className="allcontacts container-fluid d-flex flex-column h-100 ">
          <div
            className="brand text-white d-flex gap-2 justify-content-center align-items-center"
            style={{ height: "10%" }}
          >
            <div className="">
              <img src={Logo} alt="logo" className="rounded-circle" />
            </div>
            <h4 className="mb-0 fw-bold">CHATIFY</h4>

            <button
              onClick={() => changeCurrentChat(2, predefinedContact)}
              className="btn btn-tooltip"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Your Buddy"
            >
              <RiRobot2Fill
                size={28}
                className="mb-1 ms-2"
                style={{ cursor: "pointer" }}
              />
            </button>
          </div>
          <div
            className="contacts"
            style={{ overflowY: "auto", height: "80%" }}
          >
            {" "}
            {/* Add overflow-auto class here */}
            <ul className="list-group">
              {contacts.map((contact, index) => {
                return (
                  <li
                    key={contact._id}
                    className={`contact d-flex gap-2 list-group-item mx-2 ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt="image not found"
                      />
                    </div>
                    <div className="username text-white">
                      <h5
                        className="mt-1 mb-0"
                        style={{ overflowWrap: "break-word" }}
                      >
                        {contact.username}
                      </h5>

                      <h6>
                        <small>
                          {contact.status === "online" ? (
                            <GoDotFill color="green" />
                          ) : (
                            <GoDotFill color="red" />
                          )}
                          {contact.status}
                        </small>
                      </h6>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            className="current-user d-flex justify-content-center align-items-center gap-3"
            style={{ height: "10%" }}
          >
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username text-white">
              <h5 className="m-0">{currentUserName}</h5>
            </div>
            <div className="">
              <Logout className="logout" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 10% 75% 15%;
//   overflow: hidden;
//   background-color: #080420;
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//       height: 2rem;
//     }
//     h3 {
//       color: white;
//       text-transform: uppercase;
//     }
//   }
//   .contacts {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     overflow: auto;
//     gap: 0.8rem;
//     &::-webkit-scrollbar {
//       width: 0.2rem;
//       &-thumb {
//         background-color: #ffffff39;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .contact {
//       background-color: #ffffff34;
//       min-height: 5rem;
//       cursor: pointer;
//       width: 90%;
//       border-radius: 0.2rem;
//       padding: 0.4rem;
//       display: flex;
//       gap: 1rem;
//       align-items: center;
//       transition: 0.5s ease-in-out;
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
//     .selected {
//       background-color: #9a86f3;
//     }
//   }

//   .current-user {
//     background-color: #0d0d30;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 2rem;
//     .avatar {
//       img {
//         height: 4rem;
//         max-inline-size: 100%;
//       }
//     }
//     .username {
//       h2 {
//         color: white;
//       }
//     }
//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       gap: 0.5rem;
//       .username {
//         h2 {
//           font-size: 1rem;
//         }
//       }
//     }
//   }
// `;
