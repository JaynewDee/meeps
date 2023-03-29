import { useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { API } from "../api/api";

export type SocketProp = null | Socket<any, any>;

export const useChatSocket = () => {
  const [socket, setSocket] = useState<SocketProp>(null);

  useEffect(() => {
    // Init client-specific socket connection
    const socket = io();
    /////////////////////

    /////////////////
    setSocket(socket);
    /////////////////

    ///////////////////////////////
    socket.on("connect", () =>
      console.log(`Socket w/ id ${socket.id} connected`)
    );
    ///////////////////////////////

    ///////////////////////////////
    return () => {
      socket.disconnect();
    };
    ///////////////////////////////
  }, []);

  return socket;
};

export const useMessageFetch = () => {
  const [messages, setMessages] = useState();
  useMemo(async () => {
    const msgs = await API.getRecentMessages();
    setMessages(msgs);
  }, [setMessages]);

  return [messages];
};
