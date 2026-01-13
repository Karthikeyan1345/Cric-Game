let params=new URLSearchParams(window.location.search);
let team1=params.get("team1Name");
let team2=params.get("team2Name");
let batting,bowling;
let team;
let homeChoice;

document.getElementById("my-Team").innerText=team1;
document.getElementById("opp-Team").innerText=team2;

function choice(s) {
  homeChoice = s;
  document.getElementById("head-or-tail").style.display = "none";
}

function toss() {
  if (!homeChoice) {
    alert("Please choose Head or Tail !!");
    return;
  }

  const random = Math.floor(Math.random() * 2);
  const result = random == 1 ? "head" : "tail";

  if (result == homeChoice) {
    team = team1;
    document.getElementById("winner").innerText =team1+" have won the Toss";
  } else {
    team = team2;
    document.getElementById("winner").innerText =team2+" have won the Toss";
  }
  document.getElementById("flip").style.display = "none";
  document.getElementById("bat-Or-bowl").style.display = "block";
}


document.querySelectorAll("#bat-Or-bowl .decision").forEach((btn) => {
    btn.addEventListener("click", decisionHandler);
});

function decisionHandler(e) {
    tosschoice = e.target.dataset.item;
    document.getElementById("bat-Or-bowl").style.display = "none";
    document.getElementById("toss-result").innerText =team + " have won the toss and decided to " + tosschoice + " first";


  if (tosschoice == "bat") {
    batting = team;
    bowling = ((team == team1) ? team2 : team1);
  } else {
    bowling = team;
    batting = ((team == team1) ? team2 : team1);
  }
  document.getElementById("start-the-match").style.display = "block";
}

document.querySelector("#coin-toss  .go-to-match-page").addEventListener("click",()=>{
  window.location.href=
  "match_page.html?batting="+batting+"&bowling="+bowling;
})