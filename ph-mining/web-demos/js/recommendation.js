var Demo = {

	init: function()
	{
		Demo.renderButtons();

		// show first post by default
		Demo.showPostDetails(Demo.posts[0].id);
		$("#demo .box-content").css("opacity", "1");
	},

	renderButtons: function()
	{
		var html = "";
		var template = $("#post-button").html();

		for(var i = 0; i < Demo.posts.length; i++)
		{
			var p = Demo.posts[i];
			p.shortName = p.name.length > 20 ? p.name.substring(0,20) + "..." : p.name;
			html += Mustache.render(template, p);
		}

		$("#demo .box-list").append(html);

		$("#demo .post-button").on('click', Demo.postButtonClicked);
	},

	postButtonClicked: function(ev)
	{
		var elem = $(ev.toElement);
		var id = elem.attr("data-id");
		ev.preventDefault();

		Demo.showPostDetails(id);
	},

	showPostDetails: function(id)
	{
		var post = Demo.getPost(id);
		var recommendation = Demo.getRecommendations(id);
		//var recommendation = Demo.getFakeRecommendations(id);

		$("#demo .box-content h2").html(post.name);
		$("#demo .ext-url").attr("href", post.url);
		$("#demo .box-content h3").html(post.tagline.replace('"', "\'"));

		$("#demo .demo-loading").show();
	},

	getPost: function(id)
	{
		return Demo.posts.filter(function(p) { return p.id == id; })[0];
	},

	getRecommendations: function(id)
	{
		// the below code gets results from https://algorithmia.com/algorithms/ANaimi/ProductHuntVoteRings
		var client = Algorithmia.client("simknwQAmSSP+KnOv3/i9MMzWrp1");

		client.algo("ANaimi/ProductHuntRecommender").pipe(id).then(function(output) {
			if(output.error)
				return console.error("Algorithmia API Error: ", output.error);

			console.log(output.result);
			Demo.renderRecommendations(output.result);
		});
	},

	getFakeRecommendations: function(id)
	{
		// use this as a stub while developing UI
		var recomm = [{"id":"6420","name":"Spoke Point","tagline":"Craft your story. Find journalists. Get press.","url":"http://www.producthunt.com/r/a8b5b10e2a/6420?app_id=1488","support":192},{"id":"9925","name":"Pressrush","tagline":"Unlock your press outreach ninja superpowers","url":"http://www.producthunt.com/r/0ec7f232bc/9925?app_id=1488","support":179},{"id":"8147","name":"Muckrack","tagline":"Easily find & build relationships with journalists.","url":"http://www.producthunt.com/r/3f123244ec/8147?app_id=1488","support":178},{"id":"7918","name":"Presspass","tagline":"Journalists organized by beat, media outlet, & region","url":"http://www.producthunt.com/r/c68b928329/7918?app_id=1488","support":178},{"id":"8514","name":"NewsFixed","tagline":"Global marketplace for freelance journalists and creators","url":"http://www.producthunt.com/r/1753fc2421/8514?app_id=1488","support":164}];
		Demo.renderRecommendations(recomm);
	},

	renderRecommendations: function(posts)
	{
		var list = "";

		for (var i = 0; i < posts.length && i < 4; i++)
		{
			var rec = posts[i];
			var tagline = rec.tagline.length > 50 ? rec.tagline.substring(0,45) + "..." : rec.tagline;
			list += "<li><a href='" + rec.url + "' title='" + rec.tagline + "' target='_blank'>" + rec.name + "</a><i>" + tagline + "</i></li>";
		}

		$("#demo .box-content ul").html(list);
		$("#demo .demo-loading").hide();
	}
};

Demo.posts = 
[
  {
    "id": 25644,
    "name": "The Hard Thing About Hard Things",
    "tagline": "Essential advice on building and running a startup.",
    "day": "6\/25\/15",
    "featured": "TRUE",
    "comments_count": 7,
    "votes_count": 13,
    "url": "http:\/\/www.producthunt.com\/r\/7db4d3fb0242dd\/25644?app_id=1488",
    "user_id": 28426,
    "user_name": "Jonathan Li \u00ca\u00f9\u00e9\u00ca\u00f4\u00ec\u00c2\u220f\u00dc"
  },
  {
    "id": 496,
    "name": "CloudApp",
    "tagline": "Great screenshot sharing tool",
    "day": "12\/31\/13",
    "featured": "TRUE",
    "comments_count": 5,
    "votes_count": 25,
    "url": "http:\/\/www.producthunt.com\/r\/ab15561158\/496?app_id=1488",
    "user_id": 684,
    "user_name": "Mike Knoop"
  },
  {
    "id": 664,
    "name": "BillGuard",
    "tagline": "The Smart Inbox For Your Money",
    "day": "1\/9\/14",
    "featured": "TRUE",
    "comments_count": 9,
    "votes_count": 145,
    "url": "http:\/\/www.producthunt.com\/r\/4ca83ad09d\/664?app_id=1488",
    "user_id": 795,
    "user_name": "Raphael Ouzan"
  },
  {
    "id": 815,
    "name": "LEGO Ideas",
    "tagline": "Lego\"s own version of Kickstarter",
    "day": "1\/16\/14",
    "featured": "TRUE",
    "comments_count": 6,
    "votes_count": 45,
    "url": "http:\/\/www.producthunt.com\/r\/39de6660bb\/815?app_id=1488",
    "user_id": 182,
    "user_name": "James Mundy"
  },
  {
    "id": 9543,
    "name": "Android 5.0 Lollipop",
    "tagline": "A sweet new take on Android",
    "day": "10\/15\/14",
    "featured": "TRUE",
    "comments_count": 6,
    "votes_count": 84,
    "url": "http:\/\/www.producthunt.com\/r\/ca0312f642\/9543?app_id=1488",
    "user_id": 11912,
    "user_name": "Cl\u221a\u00a9ment"
  },
  {
    "id": 9589,
    "name": "Mac mini",
    "tagline": "The Mac mini receives a long-awaited update",
    "day": "10\/16\/14",
    "featured": "TRUE",
    "comments_count": 0,
    "votes_count": 54,
    "url": "http:\/\/www.producthunt.com\/r\/e99478569f\/9589?app_id=1488",
    "user_id": 1565,
    "user_name": "Ria Blagburn"
  },
  {
    "id": 25231,
    "name": "Super Block Jumper",
    "tagline": "Jump from block to block in this simple yet tricky game",
    "day": "6\/23\/15",
    "featured": "TRUE",
    "comments_count": 4,
    "votes_count": 19,
    "url": "http:\/\/www.producthunt.com\/r\/87acedcdd34675\/25231?app_id=1488",
    "user_id": 162079,
    "user_name": "alexis bonte"
  },
  {
    "id": 1535,
    "name": "HelloFlo",
    "tagline": "Tampon Delivery. Period Simplicity.",
    "day": "2\/20\/14",
    "featured": "TRUE",
    "comments_count": 2,
    "votes_count": 13,
    "url": "http:\/\/www.producthunt.com\/r\/179f95514c\/1535?app_id=1488",
    "user_id": 4366,
    "user_name": "Andrew Zusman"
  },
  {
    "id": 2441,
    "name": "BrandEmbassy",
    "tagline": "A Next Level Social Media Customer Care tool",
    "day": "4\/3\/14",
    "featured": "TRUE",
    "comments_count": 3,
    "votes_count": 20,
    "url": "http:\/\/www.producthunt.com\/r\/30598b5aa7\/2441?app_id=1488",
    "user_id": 8915,
    "user_name": "Bogomil Shopov -Bogo"
  },
  {
    "id": 2506,
    "name": "Cleanly",
    "tagline": "Simple on-demand laundry delivery",
    "day": "4\/6\/14",
    "featured": "TRUE",
    "comments_count": 13,
    "votes_count": 59,
    "url": "http:\/\/www.producthunt.com\/r\/fd17a14706\/2506?app_id=1488",
    "user_id": 9248,
    "user_name": "tomharari"
  },
  {
    "id": 2515,
    "name": "OpenBrand",
    "tagline": "Marketing and Graphic Design Collaborative Space. ",
    "day": "4\/7\/14",
    "featured": "TRUE",
    "comments_count": 4,
    "votes_count": 17,
    "url": "http:\/\/www.producthunt.com\/r\/6b509f00c7\/2515?app_id=1488",
    "user_id": 8915,
    "user_name": "Bogomil Shopov -Bogo"
  },
  {
    "id": 2605,
    "name": "AgFunder",
    "tagline": "Crowdsource fundraising for Ag and AgTech ",
    "day": "4\/10\/14",
    "featured": "TRUE",
    "comments_count": 1,
    "votes_count": 26,
    "url": "http:\/\/www.producthunt.com\/r\/9b1e9bad14\/2605?app_id=1488",
    "user_id": 522,
    "user_name": "Jonathon Triest"
  },
  {
    "id": 3031,
    "name": "SCiO",
    "tagline": "A pocket molecular sensor for all",
    "day": "4\/30\/14",
    "featured": "TRUE",
    "comments_count": 2,
    "votes_count": 31,
    "url": "http:\/\/www.producthunt.com\/r\/e83d4576c8\/3031?app_id=1488",
    "user_id": 9861,
    "user_name": "Eze Vidra"
  },
  {
    "id": 3468,
    "name": "Blueboard",
    "tagline": "the best way to reward individuals on your team.",
    "day": "5\/19\/14",
    "featured": "TRUE",
    "comments_count": 8,
    "votes_count": 30,
    "url": "http:\/\/www.producthunt.com\/r\/9d6110dca6\/3468?app_id=1488",
    "user_id": 962,
    "user_name": "Jack Smith"
  },
  {
    "id": 3979,
    "name": "Vango",
    "tagline": "Mobile marketplace for buying and selling original artwork ",
    "day": "6\/6\/14",
    "featured": "TRUE",
    "comments_count": 5,
    "votes_count": 42,
    "url": "http:\/\/www.producthunt.com\/r\/81559b4bd7\/3979?app_id=1488",
    "user_id": 546,
    "user_name": "Adam Besvinick"
  },
  {
    "id": 4274,
    "name": "Dear Kate's Yoga Pants",
    "tagline": "Yoga Pants that let you go #gocommando",
    "day": "6\/16\/14",
    "featured": "TRUE",
    "comments_count": 5,
    "votes_count": 31,
    "url": "http:\/\/www.producthunt.com\/r\/b9fc2aba76\/4274?app_id=1488",
    "user_id": 842,
    "user_name": "Ellen Chisa"
  },
  {
    "id": 4597,
    "name": "Underground Cellar",
    "tagline": "Upgrade your wine. Upgrade your life.",
    "day": "6\/24\/14",
    "featured": "TRUE",
    "comments_count": 4,
    "votes_count": 48,
    "url": "http:\/\/www.producthunt.com\/r\/87d23266ea\/4597?app_id=1488",
    "user_id": 2916,
    "user_name": "Ryan Jones"
  },
  {
    "id": 5085,
    "name": "Rewalk",
    "tagline": "FDA Approved Robotic Exoskeleton",
    "day": "7\/8\/14",
    "featured": "TRUE",
    "comments_count": 1,
    "votes_count": 37,
    "url": "http:\/\/www.producthunt.com\/r\/9956980c84\/5085?app_id=1488",
    "user_id": 7724,
    "user_name": "Eddie Wharton"
  },
  {
    "id": 5241,
    "name": "Lab Door",
    "tagline": "Consumer Reports for Supplements & Vitamins",
    "day": "7\/11\/14",
    "featured": "TRUE",
    "comments_count": 11,
    "votes_count": 71,
    "url": "http:\/\/www.producthunt.com\/r\/c5fb6f4d90\/5241?app_id=1488",
    "user_id": 329,
    "user_name": "Tom Masiero"
  },
  {
    "id": 6420,
    "name": "Spoke Point",
    "tagline": "Craft your story. Find journalists. Get press.",
    "day": "8\/6\/14",
    "featured": "TRUE",
    "comments_count": 12,
    "votes_count": 126,
    "url": "http:\/\/www.producthunt.com\/r\/a8b5b10e2a\/6420?app_id=1488",
    "user_id": 1405,
    "user_name": "Mayank Sanganeria"
  },
  {
    "id": 6515,
    "name": "Data Monkey",
    "tagline": "Codeacademy for data",
    "day": "8\/7\/14",
    "featured": "TRUE",
    "comments_count": 26,
    "votes_count": 350,
    "url": "http:\/\/www.producthunt.com\/r\/8c7c876988\/6515?app_id=1488",
    "user_id": 49,
    "user_name": "Adam Lieb"
  },
  {
    "id": 6801,
    "name": "Lish",
    "tagline": "Delicious dinner delivery from top local chefs",
    "day": "8\/13\/14",
    "featured": "TRUE",
    "comments_count": 2,
    "votes_count": 29,
    "url": "http:\/\/www.producthunt.com\/r\/f2ab230feb\/6801?app_id=1488",
    "user_id": 12188,
    "user_name": "Eric Wilson"
  },
  {
    "id": 8445,
    "name": "GrapheneDB",
    "tagline": "Graph databases as-a-service",
    "day": "9\/23\/14",
    "featured": "TRUE",
    "comments_count": 5,
    "votes_count": 138,
    "url": "http:\/\/www.producthunt.com\/r\/a749be28d4\/8445?app_id=1488",
    "user_id": 4557,
    "user_name": "Andreas Klinger"
  },
  {
    "id": 8573,
    "name": "Keyboards Club",
    "tagline": "Collection of the third party keyboards for iOS and Android.",
    "day": "9\/25\/14",
    "featured": "TRUE",
    "comments_count": 6,
    "votes_count": 126,
    "url": "http:\/\/www.producthunt.com\/r\/81a4f493f3\/8573?app_id=1488",
    "user_id": 5878,
    "user_name": "Ahmet S\u221a\u00balek"
  },
  {
    "id": 8606,
    "name": "Javelin Browser",
    "tagline": "A browser that gets mobile right.",
    "day": "9\/25\/14",
    "featured": "TRUE",
    "comments_count": 5,
    "votes_count": 80,
    "url": "http:\/\/www.producthunt.com\/r\/f941e55d10\/8606?app_id=1488",
    "user_id": 35141,
    "user_name": "nubela"
  },
  {
    "id": 8608,
    "name": "IntelliButler",
    "tagline": "Contextual machine learning content recommender & scheduler",
    "day": "9\/25\/14",
    "featured": "TRUE",
    "comments_count": 24,
    "votes_count": 81,
    "url": "http:\/\/www.producthunt.com\/r\/86dd3f8b21\/8608?app_id=1488",
    "user_id": 2946,
    "user_name": "Chase Perkins"
  },
  {
    "id": 8683,
    "name": "iconmelon",
    "tagline": "SVG icon libraries for the web",
    "day": "9\/27\/14",
    "featured": "TRUE",
    "comments_count": 2,
    "votes_count": 99,
    "url": "http:\/\/www.producthunt.com\/r\/d86b42a4ec\/8683?app_id=1488",
    "user_id": 10385,
    "user_name": "ahmet"
  },
  {
    "id": 8685,
    "name": "Berdict",
    "tagline": "Movie reviews in 400 characters from people that matter",
    "day": "9\/27\/14",
    "featured": "TRUE",
    "comments_count": 2,
    "votes_count": 85,
    "url": "http:\/\/www.producthunt.com\/r\/98fe4dea62\/8685?app_id=1488",
    "user_id": 79,
    "user_name": "Kevin William David"
  },
  {
    "id": 9307,
    "name": "Glui",
    "tagline": "The simplest way to capture, annotate and share screenshots.",
    "day": "10\/10\/14",
    "featured": "TRUE",
    "comments_count": 8,
    "votes_count": 159,
    "url": "http:\/\/www.producthunt.com\/r\/8358f88896\/9307?app_id=1488",
    "user_id": 1132,
    "user_name": "Josh Pigford"
  },
  {
    "id": 9850,
    "name": "Nativ",
    "tagline": " Build and market native mobile apps without having to code.",
    "day": "10\/22\/14",
    "featured": "TRUE",
    "comments_count": 4,
    "votes_count": 154,
    "url": "http:\/\/www.producthunt.com\/r\/4d4d312e8a\/9850?app_id=1488",
    "user_id": 79,
    "user_name": "Kevin William David"
  },
  {
    "id": 9904,
    "name": "Cheddar Up",
    "tagline": "Collect Money From Groups",
    "day": "10\/23\/14",
    "featured": "TRUE",
    "comments_count": 11,
    "votes_count": 61,
    "url": "http:\/\/www.producthunt.com\/r\/b5860baf46\/9904?app_id=1488",
    "user_id": 4366,
    "user_name": "Andrew Zusman"
  },
  {
    "id": 9925,
    "name": "Pressrush",
    "tagline": "Unlock your press outreach ninja superpowers",
    "day": "10\/23\/14",
    "featured": "TRUE",
    "comments_count": 4,
    "votes_count": 81,
    "url": "http:\/\/www.producthunt.com\/r\/0ec7f232bc\/9925?app_id=1488",
    "user_id": 187,
    "user_name": "Charlie Irish"
  },
  {
    "id": 10170,
    "name": "YouRoam",
    "tagline": "Make and Receive calls using your cell number over WiFi\/3G!",
    "day": "10\/28\/14",
    "featured": "TRUE",
    "comments_count": 6,
    "votes_count": 150,
    "url": "http:\/\/www.producthunt.com\/r\/8f1203cc25\/10170?app_id=1488",
    "user_id": 79,
    "user_name": "Kevin William David"
  },
  {
    "id": 10737,
    "name": "Joyent Manta",
    "tagline": "Big Compute for Big Data",
    "day": "11\/7\/14",
    "featured": "TRUE",
    "comments_count": 1,
    "votes_count": 19,
    "url": "http:\/\/www.producthunt.com\/r\/3210879196\/10737?app_id=1488",
    "user_id": 2131,
    "user_name": "Jeremiah Lee"
  },
  {
    "id": 12420,
    "name": "Spoil",
    "tagline": "A personalized box of happiness for someone you care about",
    "day": "12\/17\/14",
    "featured": "TRUE",
    "comments_count": 14,
    "votes_count": 312,
    "url": "http:\/\/www.producthunt.com\/r\/5adef560c6\/12420?app_id=1488",
    "user_id": 16961,
    "user_name": "James Traf"
  },
  {
    "id": 12430,
    "name": "Zula",
    "tagline": "One-tap team conference calling",
    "day": "12\/17\/14",
    "featured": "TRUE",
    "comments_count": 22,
    "votes_count": 257,
    "url": "http:\/\/www.producthunt.com\/r\/fbf5580427\/12430?app_id=1488",
    "user_id": 1880,
    "user_name": "Ben Lang"
  },
  {
    "id": 12721,
    "name": "CareerDean",
    "tagline": "Q&A for career advice",
    "day": "12\/28\/14",
    "featured": "TRUE",
    "comments_count": 8,
    "votes_count": 116,
    "url": "http:\/\/www.producthunt.com\/r\/38a782aa1b\/12721?app_id=1488",
    "user_id": 2690,
    "user_name": "Jenny Shen"
  },
  {
    "id": 13249,
    "name": "DataQuest Beta",
    "tagline": "Codecademy for Data Science",
    "day": "1\/15\/15",
    "featured": "TRUE",
    "comments_count": 8,
    "votes_count": 449,
    "url": "http:\/\/www.producthunt.com\/r\/e0028f4dc3\/13249?app_id=1488",
    "user_id": 10300,
    "user_name": "Frank Fumarola"
  },
  {
    "id": 13854,
    "name": "Giveffect",
    "tagline": "Shopify meets Salesforce for nonprofits",
    "day": "2\/2\/15",
    "featured": "TRUE",
    "comments_count": 14,
    "votes_count": 115,
    "url": "http:\/\/www.producthunt.com\/r\/d154a14935\/13854?app_id=1488",
    "user_id": 8660,
    "user_name": "Alexis Ohanian"
  },
  {
    "id": 13908,
    "name": "Pixie",
    "tagline": "Location tags that create a digital map of all your things",
    "day": "2\/3\/15",
    "featured": "TRUE",
    "comments_count": 7,
    "votes_count": 62,
    "url": "http:\/\/www.producthunt.com\/r\/d1bff9a70e\/13908?app_id=1488",
    "user_id": 851,
    "user_name": "Kris Minkstein"
  },
  {
    "id": 13954,
    "name": "GroupAhead",
    "tagline": "Connect Your Members With Your Own Mobile App",
    "day": "2\/4\/15",
    "featured": "TRUE",
    "comments_count": 9,
    "votes_count": 119,
    "url": "http:\/\/www.producthunt.com\/r\/a10c207e19\/13954?app_id=1488",
    "user_id": 2298,
    "user_name": "Andrew Bryk"
  },
  {
    "id": 14119,
    "name": "Standard Cyborg",
    "tagline": "Custom, 3D printed artificial limbs",
    "day": "2\/10\/15",
    "featured": "TRUE",
    "comments_count": 8,
    "votes_count": 68,
    "url": "http:\/\/www.producthunt.com\/r\/c94ebc668c\/14119?app_id=1488",
    "user_id": 3575,
    "user_name": "Dan Kaplan"
  },
  {
    "id": 14219,
    "name": "Borro",
    "tagline": "Unlock the Value from Your Luxury Assets",
    "day": "2\/12\/15",
    "featured": "TRUE",
    "comments_count": 1,
    "votes_count": 30,
    "url": "http:\/\/www.producthunt.com\/r\/49d95c92bf\/14219?app_id=1488",
    "user_id": 18280,
    "user_name": "\u201a\u00f2\u00fb Chris Messina \u201a\u00f2\u00fa"
  },
  {
    "id": 14685,
    "name": "Shift",
    "tagline": "Smooth image tracking add on for drones (preorder)",
    "day": "2\/24\/15",
    "featured": "TRUE",
    "comments_count": 24,
    "votes_count": 140,
    "url": "http:\/\/www.producthunt.com\/r\/91e6f6dced\/14685?app_id=1488",
    "user_id": 3307,
    "user_name": "Martin Shen"
  },
  {
    "id": 14703,
    "name": "AppMachine",
    "tagline": "Build your own mobile app, no technical knowledge needed.",
    "day": "2\/24\/15",
    "featured": "TRUE",
    "comments_count": 1,
    "votes_count": 76,
    "url": "http:\/\/www.producthunt.com\/r\/21a8257989\/14703?app_id=1488",
    "user_id": 79,
    "user_name": "Kevin William David"
  },
  {
    "id": 14745,
    "name": "ScienceBox",
    "tagline": "Simple data science collaboration & productivity on the web",
    "day": "2\/25\/15",
    "featured": "TRUE",
    "comments_count": 4,
    "votes_count": 57,
    "url": "http:\/\/www.producthunt.com\/r\/8a2c29342a\/14745?app_id=1488",
    "user_id": 8319,
    "user_name": "Erik Torenberg"
  },
  {
    "id": 15103,
    "name": "Atomwise",
    "tagline": "Better medicines faster",
    "day": "3\/6\/15",
    "featured": "TRUE",
    "comments_count": 1,
    "votes_count": 43,
    "url": "http:\/\/www.producthunt.com\/r\/43f5ff5ef8\/15103?app_id=1488",
    "user_id": 18808,
    "user_name": "Sarah Buhr"
  },
  {
    "id": 15645,
    "name": "Meerkat List",
    "tagline": "Explore the latest Meerkat streams on iOS",
    "day": "3\/20\/15",
    "featured": "TRUE",
    "comments_count": 2,
    "votes_count": 76,
    "url": "http:\/\/www.producthunt.com\/r\/e44b7f3749\/15645?app_id=1488",
    "user_id": 946,
    "user_name": "Niv Dror"
  },
  {
    "id": 15648,
    "name": "Meerkatch",
    "tagline": "The best live & upcoming Meerkat streams",
    "day": "3\/19\/15",
    "featured": "TRUE",
    "comments_count": 1,
    "votes_count": 39,
    "url": "http:\/\/www.producthunt.com\/r\/0a141f527d\/15648?app_id=1488",
    "user_id": 946,
    "user_name": "Niv Dror"
  },
  {
    "id": 20652,
    "name": "Age of Lords",
    "tagline": "The best Medieval strategy game without cats, really.",
    "day": "5\/11\/15",
    "featured": "TRUE",
    "comments_count": 1,
    "votes_count": 17,
    "url": "http:\/\/www.producthunt.com\/r\/8a2828793ba71c\/20652?app_id=1488",
    "user_id": 162079,
    "user_name": "alexis bonte"
  },
  {
    "id": 20654,
    "name": "Super Monster Mayhem: Rampage",
    "tagline": "Swipe for your life, Tap for destruction. Classic Remix",
    "day": "5\/11\/15",
    "featured": "TRUE",
    "comments_count": 0,
    "votes_count": 14,
    "url": "http:\/\/www.producthunt.com\/r\/0a256c292cd01c\/20654?app_id=1488",
    "user_id": 162079,
    "user_name": "alexis bonte"
  },
  {
    "id": 20657,
    "name": "Twin Shooter",
    "tagline": "Shoot once die Twice, crazy shooter with 2 player coop",
    "day": "5\/11\/15",
    "featured": "TRUE",
    "comments_count": 1,
    "votes_count": 16,
    "url": "http:\/\/www.producthunt.com\/r\/2da76305e17afb\/20657?app_id=1488",
    "user_id": 162079,
    "user_name": "alexis bonte"
  },
  {
    "id": 21771,
    "name": "Intake",
    "tagline": "The love child of Dr. Mario and Ikaruga",
    "day": "5\/20\/15",
    "featured": "TRUE",
    "comments_count": 2,
    "votes_count": 16,
    "url": "http:\/\/www.producthunt.com\/r\/2d5210c9296358\/21771?app_id=1488",
    "user_id": 1295,
    "user_name": "Robby Perdue"
  },
  {
    "id": 23459,
    "name": "Coin Crypt",
    "tagline": "A roguelike deckbuilding adventure",
    "day": "6\/8\/15",
    "featured": "TRUE",
    "comments_count": 1,
    "votes_count": 11,
    "url": "http:\/\/www.producthunt.com\/r\/27b4bd6b421acf\/23459?app_id=1488",
    "user_id": 1295,
    "user_name": "Robby Perdue"
  },
  {
    "id": 23460,
    "name": "Splice",
    "tagline": "An experimental and artistic puzzler",
    "day": "6\/8\/15",
    "featured": "TRUE",
    "comments_count": 1,
    "votes_count": 31,
    "url": "http:\/\/www.producthunt.com\/r\/21a828237aaad1\/23460?app_id=1488",
    "user_id": 1295,
    "user_name": "Robby Perdue"
  },
  {
    "id": 24473,
    "name": "Hitman",
    "tagline": "Agent 47 strikes back",
    "day": "6\/16\/15",
    "featured": "TRUE",
    "comments_count": 0,
    "votes_count": 26,
    "url": "http:\/\/www.producthunt.com\/r\/4c7dee2535f7ef\/24473?app_id=1488",
    "user_id": 222460,
    "user_name": "Manuel Moser"
  },
  {
    "id": 24492,
    "name": "Deus Ex: Mankind Divided",
    "tagline": "Coming 2016 for PC, Xbox One & PlayStation 4",
    "day": "6\/16\/15",
    "featured": "TRUE",
    "comments_count": 1,
    "votes_count": 28,
    "url": "http:\/\/www.producthunt.com\/r\/681f1b202fad4b\/24492?app_id=1488",
    "user_id": 222460,
    "user_name": "Manuel Moser"
  }
];

$(Demo.init);