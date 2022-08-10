FROM node:16-bullseye
COPY ./run.simple.job .
COPY ./see ./see
CMD [ "./run.simple.job" ]