'use strict';

var stopAnimate = false;
var choiceToReturn = "";

$(document).on("keyup", ".choice", function(e) {
	var allFull = true;
	var i;
	for(i = 1; $('#choice'+i).length; i++)
	{
		if($('#choice'+i).val() == "")
		{
			allFull = false;
			break;
		}
	}

	if(allFull)
	{
		$("#choices ul").append('<li><input type="text" id="choice'+i+'" class="choice" /></li>');
	}
});

$("#choices").submit(onFormSubmitted);

function onFormSubmitted() {
	choiceToReturn = getChoice();

	$('.formpage').fadeOut({
		duration: 1000
	});
	setTimeout(function() {
		$('.resultpage').fadeIn({
			duration: 2000
		});
	}, 1000);

	document.getElementById("dumroll").play();
	setTimeout(function() {
		animateResult();
	}, 250);
	setTimeout(function() {
		stopAnimate = true;
	}, 5666);

	return false;
}

function getChoice() {
	let choices = new Array();

	for(var i = 1; $('#choice'+i).length; i++)
	{
		if($('#choice'+i).val() != "")
		choices.push($('#choice'+i).val());
	}

	if(choices.length < 2)
	{
		alert("Vous devez entrer au moins deux choix !");
		return false;
	}

	var rand = Math.floor(Math.random() * choices.length + 1);

	return choices[rand - 1];
}

function animateResult()
{
	let parVal = "";
	for(var i = 0; i < choiceToReturn.length; i++)
	{
		parVal = parVal +
		String.fromCharCode(Math.floor(Math.random() * 26) + 97);
	}

	$('#result').html(parVal);

	if(!stopAnimate)
	setTimeout(function() {
		animateResult();
	}, 50);
	else
	{
		$('#result').html(choiceToReturn);
		$('#reset').fadeIn({
			duration: 1000
		});
		stopAnimate = false;
	}
}

$("#reset").click(function() {
	for(var i = 1; $("#choice"+i).length; i++)
	{
		if(i < 3)
		$("#choice"+i).val("");
		else
		$("#choice"+i).remove();
	}

	$('.resultpage').fadeOut({
		duration: 1000
	});
	setTimeout(function() {
		$('.formpage').fadeIn({
			duration: 2000
		});
	}, 1000);
});
