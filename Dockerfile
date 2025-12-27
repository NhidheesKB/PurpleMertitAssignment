FROM node:25-alpine AS build
WORKDIR /build
COPY . .
RUN npm install -g pnpm@latest-10 && pnpm install
RUN pnpm run build

FROM node:25-alpine AS production
WORKDIR /www/build
RUN npm install -g pnpm@latest-10
COPY --from=build /build/build ./
ENV NODE_ENV=production
COPY .env ./.env

COPY cred ./cred
COPY package*.json ./
RUN chmod -R 775 ./cred
RUN  pnpm i --prod
EXPOSE 3333
CMD [ "node","./bin/server.js" ]
