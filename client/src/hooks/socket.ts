import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { API } from "../api/api";
import { SessionAuthHandle } from "../auth/auth";

const currentProtocol = window.location.protocol;
const protocolByEnv =
  currentProtocol === "http:" ? `http://localhost:3001` : ``;

export type SocketProp = null | Socket<any, any>;

export const useChatSocket = (currentRoom: string): SocketProp => {
  const [socket, setSocket] = useState<SocketProp>(null);

  //

  useEffect(() => {
    ///////////////////////////////
    const socket = io(protocolByEnv);
    ///////////////////////////////
    setSocket(socket);
    ///////////////////////////////
    socket.on("connect", () => {
      console.log(`Socket w/ id ${socket.id} connected`);
      socket.emit("join room", currentRoom);
    });
    ///////////////////////////////
    socket.on("joined room", data => {
      console.log(data);
    });
    ///////////////////////////////
    return () => {
      socket.disconnect();
    };
    ///////////////////////////////
  }, []);

  return socket;
};

export const useUserRooms = () => {
  const [userRooms, setUserRooms] = useState([]);

  useEffect(() => {
    const fetchUserRooms = async () => {
      const { data } = SessionAuthHandle.getUser();
      const res = await API.getUserRooms(data._id);
      setUserRooms(res.data);
    };
    if (SessionAuthHandle.validate()) {
      fetchUserRooms();
    }
  }, []);

  return [userRooms];
};

type Author = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
};

type MessageType = {
  _id: string;
  text: string;
  author: Author;
  createdAt: string;
  recipient: string;
};

export type MessageArray = MessageType[];

export const useMessageQueue = (
  currentRoom: string
): [MessageArray, (data: MessageArray) => void] => {
  const [messageState, setMessageState] = useState<MessageArray>([]);

  const MAX_LENGTH = 50;

  useEffect(() => {
    const getMessages = async () => {
      const messages = await API.getRecentMessages(currentRoom);
      setMessageState(messages.data.reverse());
    };

    getMessages();
  }, [currentRoom]);

  const setTrimmedMessages = <T extends MessageArray>(messageData: T): void => {
    while (messageData.length > MAX_LENGTH) {
      messageData.shift();
    }
    setMessageState(messageData);
  };

  return [messageState, setTrimmedMessages];
};
