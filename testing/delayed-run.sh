#!/bin/bash

# short delay to allow for backend and frontend to start
sleep 10
# start cypress and pass all parameters
cypress run $@
