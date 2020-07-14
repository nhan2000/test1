/*Script to rock the mobile cell site.*/
/******************************************/

var changeOnes = true;

function Mobile(mobileCSSLink)
{
	console.log("Mobile() " + IsMobile());
	console.log("Mobile() " + changeOnes);
	if(IsMobile() && changeOnes)
	{
		var linkElement = document.createElement('link');

		linkElement.setAttribute('rel', 'stylesheet');
		linkElement.setAttribute('id', 'mobileStyle');
		linkElement.setAttribute('href', mobileCSSLink);

		document.getElementsByTagName('head')[0].appendChild(linkElement);
		
		changeOnes = false;
	}
	else
	{
		var linkElement = document.getElementById('mobileStyle');
		if(linkElement != null)
		{
			linkElement.parentNode.removeChild(element);
			
			changeOnes = true;
		}
	}
}