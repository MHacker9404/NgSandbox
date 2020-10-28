FROM node:current-alpine3.12 AS build
RUN npm i -g @angular/cli 
WORKDIR /server
COPY ./backend ./backend
COPY ./server.js ./
WORKDIR /build
COPY ./src ./src
COPY ./angular.json .
COPY ./package.json .
COPY ./tsconfig*.json .
COPY ./tslint.json .
RUN yarn install && yarn build

FROM node:current-alpine3.12 AS final
WORKDIR /app
COPY --from=build /build/dist ./client
COPY --from=build /server ./server
USER app
#
ENTRYPOINT ["/bin/sh"]
