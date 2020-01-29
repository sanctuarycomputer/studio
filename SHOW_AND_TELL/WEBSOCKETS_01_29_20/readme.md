<!--- SONKETS HEADER -->
<div align="center">
  <img src="img/websonkets.png" width="80%"/> 
</div>
<!--- SONKETS HEADER -->
  
---
# **Wtf is Websocket?**
Websocket is a protocol that allows a client and server to communicate bi-directionally(full-duplex) over a TCP connection. It is primarily used to power real-time data streams in web applications.

For comparison, HTTP is considered a half-duplex protocol.

Websocket is technically defined by the Internet Engineering Task Force's RFC 6455: https://tools.ietf.org/html/rfc6455

<!-- https://en.wikipedia.org/wiki/Internet_Engineering_Task_Force sick logo! -->

### **Transmission Control Protocol (TCP)**
##### https://searchnetworking.techtarget.com/definition/TCP
---
```
TCP (Transmission Control Protocol) is a standard that defines how to establish and maintain a network conversation through which application programs can exchange data.
...
- TCP is a connection-oriented protocol, which means a connection is established and maintained until the application programs at each end have finished exchanging messages. 
- It determines how to break application data into packets that networks can deliver, sends packets to and accepts packets from the network layer.
- Because it is meant to provide error-free data transmission, it handles retransmission of dropped or garbled packets as well as acknowledgement of all packets that arrive.
```
TCP is a cornerstone of internet communications technology that outlines the standards needed to ensure data can be reliably transmitted between servers and clients of all sorts across the Internet Protocol (IP).

TCP provides reliable, ordered, and error-checked delivery of a stream of data between applications running on hosts communicating via an IP network.

[Devices/Apps/Etc] <> [TCP] <> [IP]


Most of the protocols we're familiar with utilize a TCP connection, including: HTTP, SSH, FTP, SMTP, POP.

## **Websocket - How It's Made™️**
##### https://en.wikipedia.org/wiki/WebSocket#Protocol_handshake
___

Websocket is essentially an abstraction over a TCP socket that allows message-based communication.

The lifecycle of a websocket begins with the humble HTTP request...

### **Handshake via Http**

#### **Client request:**
```
GET /socket HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```

#### **Server response:**
```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```

### **Connection upgrade:**

After a connection is established via the handshake, the `socket` that the connection was made on is held and the connection is "upgraded." The upgraded connection no longer follows the HTTP standard and is now a Websocket. From here on, communication can be made in a bidirectional manner using `messages`.

Useful terms:

**Socket** - An internal endpoint for sending or receiving data within a node on a computer network.

**Port** - Similarly, an external endpoint for network communication.

**Message** - A unit of communication that's potentially composed of many frames of data.

See:
- Sections `5.5` and `5.6` of the IETF's RFC for websockets

## **What's This Look Like in Code?**
We're taking a look at this javascript library: `ws` https://github.com/websockets/ws

<!-- commence stream of consciousness source code dive -->
___
### **Understanding the Implementation (Partially)**
#### The handshake:
https://github.com/websockets/ws/blob/master/lib/websocket-server.js

See:
- `constructor`
- `handleUpgrade`
- `completeUpgrade`
  - `line 98` the `connection` event
___
#### Setting up a websocket server
https://github.com/websockets/ws/blob/master/examples/server-stats/index.js

See:
- setup of the websocket server object `wss`
- handling the `connection` event
___
#### Handling messages
https://github.com/websockets/ws/blob/master/lib/websocket.js

See: 
- setup of the socket via `setSocket`
  - notice use of the term `receiver`

https://github.com/websockets/ws/blob/master/lib/receiver.js

See: 
- `dataMessage`
  - notice the call to `emit` on `line 427`

### **Check out the example code**

1. `cd example` && `npm install`
2. run the server: `node server`
3. run the client: `node client`
4. enter some text in the client and press enter
5. wait for the server to send messages on interval

# More Good Links
- https://en.wikipedia.org/wiki/WebSocket
- https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
- https://stackoverflow.com/questions/46111656/must-websockets-have-heartbeats
- https://en.wikipedia.org/wiki/Duplex_(telecommunications)#FULL-DUPLEX
- https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
- https://en.wikipedia.org/wiki/Transmission_Control_Protocol
- https://en.wikipedia.org/wiki/Internet_Engineering_Task_Force
- https://en.wikipedia.org/wiki/Internet_Protocol

Thx for reading - Harrison Wideman
