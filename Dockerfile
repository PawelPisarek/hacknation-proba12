FROM node:22-alpine
WORKDIR /app
COPY package.json server.mjs ./
COPY scripts ./scripts
COPY app ./app
EXPOSE 3000
CMD ["node", "server.mjs"]
