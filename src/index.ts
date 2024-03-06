import express, { Express, Request, Response } from "express";
import * as http from "http";
import * as WebSocket from "ws";
import { AddressInfo } from "ws";
import { Author, Message, User } from "./models";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import { getRandomNeonColor } from "./colors";

dotenv.config();
const secret_key = process.env.SECRET_KEY;
const port = process.env.PORT;

const users: User[] = [
  {
    username: "admin",
    password: "admin",
    color: "#3a3843"
  }
];

const messages: Message[] = [
  { 
    author: {
      username: "admin",
      color: "#3a3843"
    }, 
    text: "Hello from the WebSocket!" }
];

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

function verifyAccessToken(token: string) {
  try {
    const decoded = jwt.verify(token, secret_key as string);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error };
  }
}

function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

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
    newUser.color = getRandomNeonColor();
    const existingUserName = users.findIndex(
      (user: User) => user.username === newUser.username
    );

    if (existingUserName !== -1) {
      res.status(400).json({
        status: 400,
        message: "User already exists",
      });
      return;
    }

    users.push(newUser);
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

app.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const loginCredentials = req.body;
    const userIndex = users.findIndex(
      (user: User) => user.username === loginCredentials.username
    );

    if (userIndex === -1) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
      return;
    }

    const loginUser = users[userIndex];
    const isPasswordMatched = loginUser.password === loginCredentials.password;

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

    res.status(200).json({
      status: 200,
      success: true,
      message: "login success",
      token: token,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

app.get("/chat", authenticateToken, async (req: Request, res: Response) => {
  try {
    res.send(messages);
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

app.get("/users", authenticateToken, async (req: Request, res: Response) => {
  try {
    res.send(users);
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

app.get("/", async (req: Request, res: Response) => {
  try {
    res.send("Chat App");
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

const server = http.createServer(app);
const wss = new WebSocket.Server({
  server,
});

wss.on("connection", (ws: WebSocket, request: any) => {
  const token = request.url.split("?token=")[1]; // Extract token from URL
  if (!token) {
    ws.close(401, "Unauthorized: Token missing");
    return;
  }
  let author: Author;

  jwt.verify(token, secret_key as any, function (err: any, decoded: any) {
    if (err) {
      ws.close(401, "Unauthorized: Invalid token");
      return;
    }

    const color = users.find(
      (user: User) => user.username === decoded.username
    )?.color ?? '#c5c4ff';

    author = {
      username: decoded.username,
      color
    }
  });

  ws.on("message", (message: string) => {
    messages.push({ text: message.toString(), author });
    
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(messages));
    });
  });

  ws.send(JSON.stringify(messages));
});

server.listen(port, () => {
  console.log(
    `Server started on port ${(server.address() as AddressInfo).port}`
  );
});
