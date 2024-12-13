"npx create-react-app app_name"
projects might not have node_modules in them
"npm i"
to install all neccery modules
"npm start"

is depriciated. So use some latest command like

"npm create vite@latest"

then give project name, choose react, next or others. typescript or javascript. etc.

then cd "new_project"
"npm install"
"npm run dev"




Issued occured in various phase.

ssh-key genrated using hashing with email (without RSA)

ssh-agent was not running. so ssh-add function was not working.


First had to open powershell in admin privilage and chage service type

Set-Service -Name ssh-agent -StartupType Automatic

Then start the ssh-agent service. Once done in the future it will work automatically.

Start-Service ssh-agent

Then add ssh_key

ssh-add full_path_to_ssh_private_key

Then add public key to gihub ssh keys.

Add gmail and name in local git config as global. user.name and user.email

then add the remote origin 

git remote add origin git@github.com:ieRiku/ReactProjects.01.git

git push -u origin main
git push origin main

-u is used to set upstream. So that in future if we use normal "git push" or "git pull" whole branches will be downloaded.



If in new pc need to setup.

fist initialize git repo.
git init

then add origin

git remote add origin git@github.com:ieRiku/ReactProjects.01.git

setup git config user.name and user.email

then check if ssh keys are setup as well and ssh-agent is working or not

git branch -m master main

to setup from master to main

then first git pull origin main
then git push -u origin main to set upstream

then proceed originally