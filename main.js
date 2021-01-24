class Term {
	constructor( c, e )
	{
		this.co = c;
		this.ex = e;
	}
	update( c, e )
	{
		this.co = c;
		this.ex = e;
	}
	get()
	{
		return[this.co,this.ex];
	}
}

var terms = [];
var a = 0.0;
var b = 1.0;
function getTerms()
{
	a = parseFloat(document.getElementById( "a").value );
	b = parseFloat(document.getElementById( "b").value );
	for( var i = 0; i < document.getElementsByClassName( "co").length; i++ )
	{
		if( i < terms.length )
		{
			terms[i].update( document.getElementsByClassName( "co")[i].value, document.getElementsByClassName( "ex")[i].value );
		}
		else
		{
			terms.push( new Term ( document.getElementsByClassName( "co")[i].value, document.getElementsByClassName( "ex")[i].value ) );
		}
	}
	equate();
	
}
function setTerms()
{
	for ( var i = 0; i < terms.length; i++)
	{
		document.getElementsByClassName("co")[i].value = terms[i].get()[0];
		document.getElementsByClassName("ex")[i].value = terms[i].get()[1];
	}
}
function updateTerms()
{
	var numTerms = parseInt( document.getElementById( "terms" ).value );
	if( numTerms < 1 )
	{
	
	}
	var difference = numTerms - terms.length;
	if( difference > 0 )
	{
		for( var i = 0; i < difference; i++ )
		{
			document.getElementById( "fofx" ).innerHTML += "<span class = 'term'>&nbsp;&nbsp;+&nbsp;&nbsp;<input class = 'co' type = 'number' onchange = 'getTerms()' value = '0'>x<input class = 'ex' type = 'number' onchange = 'getTerms()' value = '0'></span>"	
			setTerms();
			getTerms();
			//setTerms();
		}
	}
	if( difference < 0 )
	{
		for( var i = 0; i < -difference; i++ )
		{
			console.log( document.getElementById( "fofx" ).children[ document.getElementById( "fofx" ).children.length - 1] );
			document.getElementById( "fofx" ).removeChild(document.getElementById( "fofx" ).children[ document.getElementById( "fofx" ).children.length - 1]);
			terms.pop();
			//setTerms();
			//getTerms();
			//setTerms();
		}
	}
	equate();
}
function equate()
{
	var n = 100000.0;
	var neg = false;
	if( b < a )
	{
		neg = true;
		var temp = a;
		a = b;
		b = temp;
	}
	var dx = (b-a)/n;
	var integral = 0;
	if( b != a ){
		for( var i = a; i < b; i+= dx )
		{
			integral += !neg ? f(i) * dx : -( f(i) * dx );
		}
	}
	document.getElementById("ans").innerHTML =  integral.toFixed(4);
}
function f(x)
{	
	var sum = 0;
	for ( var i = 0; i < terms.length; i++ )
	{
		var val;
		if( terms[i].ex < 0 )
			val =  terms[i].co * (1.0 / Math.pow( x, -terms[i].ex ) );
		else
			val =  terms[i].co * Math.pow( x, terms[i].ex ) ;
		
		sum += val;
	}
	return sum;
}
getTerms();