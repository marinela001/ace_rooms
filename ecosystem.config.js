module.exports = {
   apps: [
	       {
		             script: "npm start",
		           },
	     ],

  deploy : {
    production : {
	    key:"test.pem",
      user : 'ubuntu',
      host : '3.72.85.69',
      ref  : 'origin/main',
      repo : 'git@github.com:marinela001/ace_rooms.git',
      path : '/home/ubuntu/ace_rooms',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
