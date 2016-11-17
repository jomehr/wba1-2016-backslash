//TODO write var to store array of all PlayersElements
// every single playerElement holds Position, PlayerName, Points
// write a function to add all Player at once.
// sort before add if neccessary.

function test()
{
	var Position = 1;
	var Player = "ME :D";
	var Points = 50;

	for(var i = 0; i < 50; i++){
		addPlayer(Position, Player, Points);
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