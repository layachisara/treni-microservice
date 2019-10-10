#!/usr/bin/env bash

function setup-swarm {
  # go to docker folder
  cd _docker_setup

  echo '···························'
  echo '·· setting up the swarm  >>>> ··'
  echo '···························'

  # create and init the swarm cluster
  (bash < ./setup-swarm.sh)

  # go back to the root project
  cd ..
}

function setup-mongo {
  echo '···························'
  echo '·· <<<< git clone the mongodb cluster  ··'
  echo '···························'

  rm -rf mongo-replica-with-docker

  # download  mongo-replica-set configuration
  git clone https://github.com/layachisara/treni-microservice-V1-.git

  echo '···························'
  echo '·· setting up the mongodb cluster  >>>> ··'
  echo '···························'
  # go into the folder
  cd mongo-replica-with-docker

  # create and init our mongodb replica set cluster
  (bash < create-replica-set.sh)

  # go back to the root project
  cd ..
}

function setup-images {

    # inside the docker folder again
    cd _docker_setup

    echo '···························'
    echo '·· creating microservices images >>>>  ··'
    echo '···························'

    # start all our microservices
    (bash < create-images.sh)

   cd ..
}

function setup-services {

    # go inside the docker folder
    cd _docker_setup

    echo '···························'
    echo '·· starting up the microservices >>>>  ··'
    echo '···························'

    # start all our microservices
    (bash < start-services.sh)

   cd ..
}

function status {
  eval `docker-machine env manager1`
  # verify the docker swarm
  docker node ls

  # verify our docker services
  docker service ls
}

function main {
  setup-swarm
  setup-mongo
  setup-images
  setup-services
  status
}

main
