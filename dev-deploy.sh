#!/bin/env bash
sudo systemctl start docker.service 
docker-compose up -d --build 
http POST :3000/patients first_name="Richard" last_name="Smith" email="richarsd@email.com" phone=123456789 address="123 Main St" diagnosis="Light Cough" image_url="https://imageserver.com/lamo.png"


