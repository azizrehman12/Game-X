var num1 = Math.floor((Math.random()*6)+1);
var img1 = "./dice"+num1+".png";
document.querySelectorAll("img")[0].setAttribute("src",img1);

var num2 = Math.floor((Math.random()*6)+1);
var img2 = "./dice"+num2+".png";
document.querySelectorAll("img")[1].setAttribute("src",img2);

if(num1>num2){
    document.querySelector("h1").innerHTML="Player 1 wins";
}
else if(num1<num2){
    document.querySelector("h1").innerHTML="Player 2 wins";
}
else{
    document.querySelector("h1").innerHTML="Draw!";
}