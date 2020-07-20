FROM node as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
WORKDIR /usr/src/app
RUN npm install

COPY . /usr/src/app

# run tests
#RUN ng test --watch=false

# generate build
RUN npm run build

FROM nginx

# copy artifact build from the 'build environment'
COPY --from=builder /usr/src/app/build /var/www

COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
