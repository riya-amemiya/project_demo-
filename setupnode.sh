#!/bin/sh
/usr/bin/ruby -e "\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew -v
brew install git
brew install nodebrew
mkdir -p ~/.nodebrew/src
nodebrew install-binary {v10.15.3}
nodebrew use v10.15.3
echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.bash_profile
source ~/.bashrc
npm install -g yarn
cd ~/Desktop/
mkdir programming
cd programming
mkdir node
cd node
mkdir project
cd project
git init
git remote add $1 "https://github.com/riya81/project_demo-"
git pull $1 master
npm run setup
webpack --mode production
webpack-dev-server --mode development --open