FROM node:16-bullseye
COPY ./run.simple.job .
COPY ./see ./see
RUN cd ./see && npm install
CMD [ "./run.simple.job" ]