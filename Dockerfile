FROM node:12-alpine
WORKDIR /app
COPY . .
RUN npm install --production
EXPOSE 28346
CMD ["npm", "start"]