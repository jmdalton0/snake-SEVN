#!


git pull;

npm install;

cd ../src/client/;
npm install;
npm run build;
cd ../../;

npm run start;

sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
