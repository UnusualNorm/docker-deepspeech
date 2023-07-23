FROM node:15
WORKDIR /app
COPY . .
RUN npm install --production --freeze-lockfile
RUN touch deepspeech.pbmm
EXPOSE 28346
CMD ["npm", "start"]