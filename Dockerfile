FROM node:8
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

COPY ./src ./src
RUN npm run-script build


EXPOSE 9000

CMD [ "npm", "run-script", "live" ]
