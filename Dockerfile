FROM ubuntu

WORKDIR /app
COPY . .

RUN apt-get update && apt-get install -y \
    npm

RUN npm install --production --freeze-lockfile
RUN touch deepspeech.pbmm

EXPOSE 28346
CMD ["npm", "start"]