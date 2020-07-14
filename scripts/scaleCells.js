/*Script to rock the cells. Or scale them!*/
/******************************************/

/*check for low resolution*/
function IsMobile()
{
	console.log(window.outerWidth);
	console.log(window.outerHeight);
	if(window.outerWidth < 1536 || window.outerHeight < 864)
	{
		return true;
	}
	else
	{
		return false;
	}
}

/*onResize == false: First time function loaded in onLoad
  onResize == true: In the onresize event not everything needs to be calculated
*/
function InitializeCells(onResize) 
{
    /*
    JS variable names, initialised outside JS file.
	
	Vars:
	totalMainCells
	cellsOnRow

	Arrays:
    widthCells
    heightCells
    lockedCells
    ********************************************
    */
	
	/* Performances calculation */
	if(debugModus)
	{
		var startTime = new Date();
	}
	
	if(IsMobile())
	{
		InitializeCellsLowRez(true, onResize);
	}
	else
	{
		InitializeCellsLowRez(false, onResize);
	}
	
	/* Performances calculation */
	if(debugModus)
	{
		var Duration = new Date() - startTime;
		console.log(Duration + "ms");
	}
}

function InitializeCellsLowRez(lowRes, onResize)
{
	var rows = totalMainCells / cellsOnRow;
	
	//needed for calculating each row.
	for(var j = 0; j < rows; j++)
	{
		//Calculate beginning each row.
		var startOfRow = j * cellsOnRow;
	
		if(!onResize)
		{
			var totalWidthCount = 0;
			//look at all cells in a "row". 
			//A row isn't defined by <div>, but by cellsOnRow
			for (var i = 1; i <= cellsOnRow; i++) 
			{	
				/*Count up the widthCells percentage count*/
				totalWidthCount += parseInt(widthCells[i + startOfRow - 1]);
			}

			var resolutionPart;

			if(lowRes)
			{
				//  resolution HD
				resolutionPart = 1920 / totalWidthCount;
			}
			else
			{
				//  100% / totalWidthCount (percentage)
				resolutionPart = 100 / totalWidthCount;
			}
		
			/*Put width on <div id="cell">*/
			for (i = 1; i <= cellsOnRow; i++) 
			{	
				var element = document.getElementById("cell" + (i + startOfRow).toString());
		
				if(lowRes)
				{
					//Calculate width of each cell.
					var partOfElement = parseInt(widthCells[i + startOfRow - 1]) * resolutionPart;
					console.log(partOfElement.toString() + "px");
					element.style.width = partOfElement.toString() + "px";
				}
				else
				{
					//Calculate width of each cell.
					var percentageOfElement = parseInt(widthCells[i + startOfRow - 1]) * resolutionPart;
					console.log(percentageOfElement.toString() + "%");
					element.style.width = percentageOfElement.toString() + "%";
				}
			}	
		}
	
		/*needed to resize height well*/
		if(onResize)
		{
			/*Put height on <div id="cell">*/
			for (i = 1; i <= cellsOnRow; i++) 
			{
				var element = document.getElementById("cell" + (i + startOfRow).toString());
			
				element.style.height = "1px";
			}	
		}
	
		var biggestHeight = 0; 
		if(debugModus)
		{
			console.log("Height: " + biggestHeight);
		}
		//look at all cells in a "row". 
		//A row isn't defined by <div>, but by cellsOnRow
		for (var i = 1; i <= cellsOnRow; i++) 
		{
			/*Find biggest element height*/
			var elementHeight = document.getElementById("cell" + (i + startOfRow).toString()).scrollHeight;
			if(elementHeight > biggestHeight)
			{
				biggestHeight = elementHeight;
			}
		}
		
		if(debugModus)
		{
			console.log("Height: " + biggestHeight);
		}
	
		/*Put height on <div id="cell">*/
		for (i = 1; i <= cellsOnRow; i++) 
		{
			var element = document.getElementById("cell" + (i + startOfRow).toString());
			
			//Height
			var thisHeight = heightCells[i + startOfRow - 1];
			
			//Lock height or not.
			if(thisHeight != "")
			{
				element.style.height = thisHeight.toString() + "px";
			}
			else
			{
				element.style.height = biggestHeight.toString() + "px";
			}
		}	
	}
}