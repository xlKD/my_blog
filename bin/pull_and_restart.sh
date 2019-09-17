cd ~/Code/my_blog
git reset --h origin master
npm install
pm2 restart npm --log-date-format 'DD-MM HH:mm:ss.SSS'
