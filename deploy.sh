cd /home/mxr/Server/misi-site

pm2 delete misi-site

git fetch
git checkout production
git pull origin production

rm -r ./dist/*
npm install

cd ./front
npm install
npm run build

cp -r ./build/* ../dist/

cd ..

echo Built and copied

PORT=7077
pm2 start server.js --name misi-site
echo Restarted server