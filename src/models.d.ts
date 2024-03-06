export interface User {
    username: string,
    password: string,
    color: string
}

export type Author = Pick<User, "username" | "color">;

export type Message = {
    text: string,
    author: Author
}