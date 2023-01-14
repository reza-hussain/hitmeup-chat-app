﻿# HMU Chat-Application (MERN)

![HMU Chat-App ](https://i.imgur.com/Ichl0Ki.png)

Hi there ***Developers***. This is my first time creating a fully functional **Real-Time Chat Application** using ***React JS*** and ***Socket IO***. My aim before beginning this project was to code everything on my own and take little to no help from the internet, and here I am.

This app still lacks a lot of features that I'm going to implement soon, but I was really excited to push everything that was working until now.

# Technologies Used 🚀

## Front-end
 - React JS 
 - Tailwind CSS

## Back-end
 - Node JS
 - Socket IO
 - MongoDB

# Features 🚀

 - ✔️ User Details Form (No Authentication)
 - ✔️ Sending and Receiving Messages
 - ✔️ Create and Join Rooms
 - ✔️ Typing Status

## To be added...
 - ⌛ User Authentication
 - ⌛- Login/Log out
 - ⌛- Leave Room
 - ⌛- Delete Room
 - ⌛- User Details

# Working of The Application 🚀

## User Details Form
This is the user login form. Currently, there is no User Authentication  and Validation. This form just takes the form details and pushes it to the local storage
![chat-app-form](https://i.imgur.com/Vjfsxkf.png)

## Creating a Chat/Room
Users can create a chat/room and send messages to one another within the room. Whenever a user creates a new room, a random ID is generated for that specific room.
![Creating a Chat/Room](https://i.imgur.com/zXmnGIx.png)

## Joining A Room
The ID that is generated when a new room is created, can be used for other users to join that room.
![Joining A Room](https://i.imgur.com/z1yIWbP.png)

## Sending and Receiving Messages

Users can send and receive messages inside a particular room. Users can also see when another user is typing a message. The ID you see before the typing message is the *Socket ID* that is being generated by **Socket IO** for each user.
![Sending and Receiving messages ](https://i.imgur.com/BaEfVS0.png)


# Conclusion
This is one of my personal projects that I like building during my leisure time to get better at development. If you like what I'm doing, please leave a ⭐ and follow for more projects 
