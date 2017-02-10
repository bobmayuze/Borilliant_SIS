var express = require('express');
var router = express.Router();

var cheerio = require ('cheerio');
// Import phantomjs module
var phantom = require('phantom');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Borilliant X SIS' });
});

router.get('/main', (req, res, next) => {
  res.render('main.jade', { 
  	title: 'Borilliant X SIS'
  });
});

router.post('/main', (req, res, next) => {
	// var info = ({
	// 	username: req.body.username,
	// 	password: req.body.password
	// });
	let {username, password} = req.body;
	console.log('===== Request successfully get ====');
	// console.log(info['username']);
	console.log("got here");


	phantom.create().then(function(ph) {
		ph.createPage().then(function(page) {
			page.property('viewportSize', {width: 1080, height: 800});
			page.setting('settings', {
				userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11",
				javascriptEnabled: true,
				loadImages: true
			});
			page.open('https://sis.rpi.edu/rss/twbkwbis.P_WWWLogin').then(function(status) {
				console.log(status);
				console.log("===POINT A===")
				page.evaluate(function(username, password) {	
					document.querySelector("input[id='UserID']").value = username;
					document.querySelector("input[name='PIN']").value = password;
					document.querySelector("input[value='Login']").click();
					console.log("Login submitted!");
				}, username, password).then(function () {
					setTimeout(function () {
						page.render('public/spot_a.png');
						console.log('lolololol');
					},2000);
					console.log("Life is short")
				}).then(function () {
					console.log('===POINT B===')
				}).then(function () {
					setTimeout(function () {
						res.redirect('/spot_a.png')
						page.close();
						ph.exit();
					},3000)
					console.log('====END====')
				});				
			// setTimeout(function () {
			// 	page.property('content').then(function(content) {
			// 		// console.log(content);
			// 		let $ = cheerio.load(content)
			// 		// console.log($('table.menuplaintable').html())
			// 		// console.log($('div.staticheaders').html())
			// 		page.render('test.png');
			// 		page.close();
			// 		ph.exit();

			// 		res.redirect('/')	
			// 	});
			// }, 5000);

			});			
		});
	});



});

module.exports = router;

