FROM node:latest
COPY . .
RUN npm install
EXPOSE 300
CMD [ "node", "server.mjs" ]



