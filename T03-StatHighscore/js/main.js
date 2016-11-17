//TODO write var to store array of all PlayersElements
// every single playerElement holds Position, PlayerName, Points
// write a function to add all Player at once.
// sort before add if neccessary.



function test()
{
	var Position = 1;		
	var min = 5;
	var max = 1000;
	
	for(var i = 0; i < 50; i++){
		// Add your own words to the wordlist. Be carefull to obey the showed syntax
		var wordlist1 = ["Runny", "Buttercup", "Dinky", "Stinky", "Crusty",
						"Greasy","Gidget", "Cheesypoof", "Lumpy", "Wacky", "Tiny", "Flunky",
						"Fluffy", "Zippy", "Doofus", "Gobsmacked", "Slimy", "Grimy", "Salamander",
						"Oily", "Burrito", "Bumpy", "Loopy", "Snotty", "Irving", "Egbert , Snicker", "Buffalo", "Gross", "Bubble", "Sheep",
						"Corset", "Toilet", "Lizard", "Waffle", "Kumquat", "Burger", "Chimp", "Liver",
						"Gorilla", "Rhino", "Emu", "Pizza", "Toad", "Gerbil", "Pickle", "Tofu", 
						"Chicken", "Potato", "Hamster", "Lemur", "Vermin"];
			
		var wordlist2 = ["Hamster","Moose","Lama","Duck","Bear","Eagle","Tiger",
						"Rocket","Bullet","Knee","Foot","Hand , face", "dip", "nose", "brain", "head", "breath", 
						"pants", "shorts", "lips", "mouth", "muffin", "butt", "bottom", "elbow", 
						"honker", "toes", "buns", "spew", "kisser", "fanny", "squirt", "chunks", 
						"brains", "wit", "juice", "shower , Waffer", "Lilly","Rugrat","Sand", "Fuzzy","Kitty",
						"Puppy", "Snuggles","Rubber", "Stinky", "Lulu", "Lala", "Sparkle", "Glitter",
						"Silver", "Golden", "Rainbow", "Cloud", "Rain", "Stormy", "Wink", "Sugar",
						"Twinkle", "Star", "Halo", "Angel"]
									
			// Random numbers are made 
			var randomNumber1 = parseInt(Math.random() * wordlist1.length);
			var randomNumber2 = parseInt(Math.random() * wordlist2.length);
			var name = wordlist1[randomNumber1] + " " + wordlist2[randomNumber2];			
			
			//alert(name); //Remove first to slashes to alert the name
		
		addPlayer(Position++, name, Points = (Math.round(Math.random() * (max - min)) + min));
	}
}


/*
 * adds a single element to the table
 */
function addPlayer(position, player, points) 
{
	var tableDiv = document.getElementById("player_table");
	
	var div = document.createElement('tr');
	div.className = 'table_element';
	div.innerHTML = '<td>'+position+'</td><td>'+player+'</td><td>'+points+'</td>';
	
	tableDiv.appendChild(div);
}