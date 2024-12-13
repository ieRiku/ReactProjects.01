Sometimes like with version node 22 or 23 npx and npm does not work dure to limitation in policies.
As process execution is forbidden in loacal computer. Then go to node directory "C/users/user_name/AppData/Roaming/nvm/v23or v22 etc"
Then just delete npm.ps1 npx.ps1. The error should go away.
error is like this.

PS D:\RIKU\CODING\Web_dev\Practice\4.ImageSlider> npx -v    
npx : File C:\Program Files\nodejs\npx.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see 
about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ npx -v
+ ~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess


After successful npm, nvm, npx, node, nvm setup.


"npx create-react-app app_name" (depriciated, use vite@latest)
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