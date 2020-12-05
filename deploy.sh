cd /home/mxr/Server/misi-site

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

pm2 restart misi-site
echo Restarted server