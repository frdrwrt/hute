FROM python:buster

RUN pip install ansible
RUN pip install docker

WORKDIR /github/workspace
RUN ./hute start-test

# Code file to execute when the docker container starts up (`entrypoint.sh`)
ENTRYPOINT ["/entrypoint.sh"]