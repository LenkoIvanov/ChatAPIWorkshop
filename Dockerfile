FROM node:18.16
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY src/ ./
COPY tsconfig.json ./
RUN npm run build
CMD ["node", "dist/index.js"]