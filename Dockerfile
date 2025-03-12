FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon  # Instalar nodemon globalmente
COPY . .
EXPOSE 4003
CMD ["nodemon", "server.js"]  # Usar nodemon en lugar de node
