FROM node:12.13.0-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S app
COPY . .
RUN yarn
RUN chown -R app /opt/app
USER app
EXPOSE 3000
EXPOSE 8080
CMD [ "yarn", "startBoth" ]
