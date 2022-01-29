#!/bin/env bash
yum update -y
amazon-linux-extras install docker
service docker start
usermod -aG docker ec2-user
chkconfig docker on
sudo curl -L https://github.com/docker/compose/releases/download/docker-compose-`uname -s`-`uname -m` | sudo tee /usr/local/bin/docker-compose > /dev/null
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose up -d --build 
http POST :3000/patients first_name="Richard" last_name="Smith" email="richarsd@email.com" phone=123456789 address="123 Main St" diagnosis="Light Cough" image_url="https://imageserver.com/lamo.png"


