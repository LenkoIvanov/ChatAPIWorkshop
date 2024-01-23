import express, { Express, Request, Response } from "express";
import * as http from 'http';
import * as WebSocket from 'ws';
import { AddressInfo } from "ws";
import { Message, User } from "./models";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();
const secret_key = process.env.SECRET_KEY;
const port = process.env.PORT;

const users: User[] = [
    {
        username: 'admin',
        password: 'admin'
    }
]

const messages: Message[] = [];

const app: Express = express();
app.use(cors());
app.use(
    express.urlencoded({
      extended: true,
    })
  );


function verifyAccessToken(token: string) {
    const secret = 'your-secret-key';
  
    try {
      const decoded = jwt.verify(token, secret);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error };
    }
  }

function authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.sendStatus(401);
    }
  
    const result = verifyAccessToken(token);
  
    if (!result.success) {
      return res.status(403).json({ error: result.error });
    }
  
    req.username = (result.data as JwtPayload).username;
    next();
  }

app.post("/auth/register", async (req: Request, res: Response) => {
    try {
      const newUser = req.body;
      const existingUserName = users.findIndex((user: User) => user.username === newUser.username);

      if (existingUserName !== -1) {
        res.status(400).json({
          status: 400,
          message: "User already exists",
        });
         return;
      }

      res.status(200).json({
        status: 201,
        success: true,
        message: "User created Successfully",
        user: newUser,
      });
    } catch (error: any) {
      res.status(400).json({
        status: 400,
        message: error.message.toString(),
      });
    }
  });



  app.post("/auth/login", async (req: any, res: any) => {
    try {
        console.log('req.body', req);
        
      const loginCredentials = req.body;
      const userIndex = users.findIndex((user: User) => user.username === loginCredentials.username);

      if (userIndex === -1) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "User not found",
        });
        return;
      }
  
  
      const loginUser = users[userIndex];
      const isPasswordMatched = users[userIndex].password === loginCredentials.password;
  
      if (!isPasswordMatched) {
        res.status(400).json({
          status: 400,
          success: false,
          message: "wrong password",
        });
          return;
      }
  
      const token = jwt.sign(
        { username: loginUser.username },
        secret_key as string,
        {
          expiresIn: "1d",
        }
      );
  
      // send the response
      res.status(200).json({
        status: 200,
        success: true,
        message: "login success",
        token: token,
      });
    } catch (error: any) {
      // Send the error message to the client
      res.status(400).json({
        status: 400,
        message: error.message.toString(),
      });
    }
  });

  app.get("/chat", authenticateToken,  async (req: Request, res: Response) => {
    try {
      res.send(messages);
    } catch (error: any) {
      // Send the error message to the client
      res.status(400).json({
        status: 400,
        message: error.message.toString(),
      });
    }
  });

  app.get("/",  async (req: Request, res: Response) => {
    try {
      res.send("HI ALEK");
    } catch (error: any) {
      // Send the error message to the client
      res.status(400).json({
        status: 400,
        message: error.message.toString(),
      });
    }
  });


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket, info: any) => {
    ws.on('message', (message: string) => {
        messages.push({text: message.toString(), author: info.username})
        wss.clients
            .forEach(client => {
                client.send(`Hello, broadcast message -> ${message}`);
            });
    });

    ws.send('Hi there, I am a WebSocket server');
});

server.listen(port, () => {
    console.log(`Server started on port ${(server.address() as AddressInfo).port}`);
});