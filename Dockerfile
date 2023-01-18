FROM node:lts-alpine AS build

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /src/bin .
CMD [ "node", "index.js" ]
