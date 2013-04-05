var gameArray = [];
var tileImgsrc="http://photos1.meetupstatic.com/photos/event/8/c/2/a/highres_163175882.jpeg"

for(var i =0; i<6 ;i++){
//Generate a random number between 900 and 1250
var urlNum = Math.floor(Math.random()*(1250-900+1)+900);

//Concatenate to lolcat URL
var url = "http://lolcat.com/images/lolcats/"+urlNum+".jpg";

//Stick it in an array twice
gameArray.push(url);
gameArray.push(url);
}//end for 
//TODO: Randomize array
for(var x = gameArray.length-1;x>0;x--){
	var j=Math.floor(Math.random()*(x+1));
	var temp = gameArray[x];
	gameArray[x]=gameArray[j];
	gameArray[j]=temp;
}
//draw our table
var tableElem=document.createElement("table");
//create 4 rows
var tdCounter=-1;
for(i =0; i<4;i++){
	var currentRow=document.createElement("tr");
	//for each row, we want 3 <td> elems with id=1 and class=tile
	for(var j= 0;j<3;j++){
		var currentCell=document.createElement("td");
		tdCounter++;
		currentCell.setAttribute("class","tile");
		//set IMG
		var imgElem=document.createElement("img");
		imgElem.setAttribute("src",tileImgsrc);
		imgElem.setAttribute("width",150);
		imgElem.setAttribute("id",tdCounter);
		imgElem.onclick=clickTile;

		//append imgElem to currentCell
		currentCell.appendChild(imgElem);
		//append this to currentRow
		currentRow.appendChild(currentCell);
	}
	//append currentRow to tableElem
	tableElem.appendChild(currentRow);
}
//append table to document
document.body.appendChild(tableElem);


//event handler
function clickTile(){
	//we only want two flipped at a time
	if(document.getElementsByClassName("flipped").length<2){

		console.log("in clickTile")
		var self=this;
		var tileID=self.id;
		//if an img element that matches tileID already exists, we need to modify its
		//display to "". Otherwise we need create the img element.
		//if next/prev sibling is img with src===gameArray[tileID], then set display to ""
		//we need to check if this element was previous flipped. if so, there is already an img element created.
		var next = self.nextElementSibling;
		var prev = self.previousElementSibling;
		if(next!=null){
			if(next.src===gameArray[tileID]){
				next.style.display="";
				next.setAttribute("class","flipped")
			}

		}
		else if(prev!=null){
			if(prev.src===gameArray[tileID]){
				prev.style.display="";
				prev.setAttribute("class","flipped")
			}
		}
		else{
			//create img tag for this flipped element

			var imgFlip = document.createElement("img");
			imgFlip.setAttribute("src",gameArray[tileID]);
			imgFlip.setAttribute("width",250);
			imgFlip.setAttribute("class","flipped");
			
			self.parentNode.appendChild(imgFlip);
			}
		self.setAttribute("class","hidden");
		self.style.display='none';
		//if no other class "flipped," keep open.
		var flipped = document.getElementsByClassName("flipped");
		if (flipped.length>1){
			checkMatched(flipped);
		} 
	}//end if flipped<2
}//end clickTile

//takes an array of elements with class "flipped" 
//and checks if they match
//flipped should be
function checkMatched(arr){
	//start by assuming arr is 2. 
	if(arr[0].getAttribute("src")===arr[1].getAttribute("src"))
	{
		while(arr.length>0){
			arr[0].setAttribute("class","matched");
		}
		//TODO match celebratory
		//scoreboard? confetti?
	}
	else{
		//flip 'em back over
		//arr is a live node list, so we need to make sure not to change class name 
        //until we are done
        //BUG sometimes previous elementsibling sets wrong img tag with tile.
        //previous elementsibling isn't reliable. can we do this by id?
			setTimeout(function(){
				while(arr.length>0){
					arr[0].style.display='none';
					arr[0].previousElementSibling.style.display="";
					arr[0].previousElementSibling.setAttribute("class","tile")
					arr[0].setAttribute("class","");
				}
			},5000);
	}//end else
}//end checkMatched
//when i click element, 
//get the id. 
//then display gameArray[id+1]

//randomize array


//need to lay out the table. (do this in html?)

//need to add an event handler when tiles are flipped