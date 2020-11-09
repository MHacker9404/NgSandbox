FROM node:current-alpine3.12 AS build
RUN npm i -g @angular/cli 
WORKDIR /server
COPY ./backend  .
WORKDIR /build
COPY ./src ./src
COPY ./angular.json .
COPY ./package.json .
COPY ./tsconfig*.json ./
COPY ./tslint.json .
RUN yarn install && yarn build

FROM node:current-alpine3.12 AS final
EXPOSE 5000
USER node
WORKDIR /app
COPY --from=build /build/dist ./client
COPY --from=build /server .
RUN yarn install

# ENTRYPOINT ["/bin/sh"]
CMD ["node", "server.js"]
