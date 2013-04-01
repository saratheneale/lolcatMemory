var gameArray = [];
var tileImgsrc="http://photos1.meetupstatic.com/photos/event/8/c/2/a/highres_163175882.jpeg"

for(var i =0; i<6 ;i++){
//Generate a random number between 900 and 1250
var urlNum = Math.floor(Math.random()*(1250-900+1)+900);

//Concatenate to lolcat URL
var url = "http://lolcat.com/images/lolcats/"+urlNum+".jpg";

//Stick it in an array
gameArray.push(url);
gameArray.push(url);
}//end for 
//TODO: Randomize array

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


/*//iterate through array and display each image
for(i=0;i<gameArray.length;i++){
	//print to webpage
	var tableElement =document.getElementById(i+1); 
	var imgElement = document.createElement("img");
	imgElement.setAttribute("src","https://s.chzbgr.com/s/release_20130329.3/img/site_banners/banner-1.png");
	tableElement.appendChild(imgElement);
}*/

//event handler
function clickTile(){
	console.log("in clickTile")
	var self=this;
	var tileID=self.id;

	var imgFlip = document.createElement("img");
	imgFlip.setAttribute("src",gameArray[tileID]);
	imgFlip.setAttribute("width",250);
	imgFlip.setAttribute("class","flipped");
	self.setAttribute("class","hidden");
	self.style.display='none';
	self.parentNode.appendChild(imgFlip);
	
	//if no other class "flipped," keep open.
	var flipped = document.getElementsByClassName("flipped");
	if (flipped.length>1){
		checkMatched(flipped);
	} 
	//if there is another class "flipped", 
	//flip back over in 3 seconds


}//end clickTile

//takes an array of elements with class "flipped" 
//and checks if they match
//flipped should be
function checkMatched(arr){
	//start by assuming arr is 2. 
	if(arr[0].getAttribute("src")===arr[1].getAttribute("src"))
	{
		while(arr.length>0){
			arr[0].setAttribute("class","matched");}
	}
	else{
		//flip 'em back over
		//arr is a live node list, so we need to make sure not to change class name 
        //until we are done

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