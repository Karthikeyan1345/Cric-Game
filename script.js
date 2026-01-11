let team1 = "CSK";
let team2 = "KKR";
let homeChoice = "";
let team, tosschoice;
let team1Score = 0;
let team2Score = 0;
let currentTeam=1;
let batting, bowling;

let balls = [
  "normal",
  "normal",
  "noball",
  "normal",
  "normal",
  "wide",
  "normal",
  "normal",
  "wicket",
];
let runs = [0, 1, 2, 3, 4, 6];
let chaseScore=-1;
let totalRuns = 0;
let wickets = 0;
let ballNo = 1;


const battingOutput = document.getElementById("battingOutput");
const battingTeam = document.getElementById("battingTeam");
const bowlingTeam = document.getElementById("bowlingTeam");
const targetScore = document.getElementById("targetScore");

let playBtn = document.getElementById("playBtn");
let nextBtn = document.getElementById("nextBtn");
nextBtn.style.display = "none";

document.querySelectorAll("#your-team .team-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const selected = btn.dataset.item;
    team1 = selected;

    document.getElementById("team-1").innerText = selected;
  });
});

document.querySelectorAll("#opp-team .team-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const selected = btn.dataset.item;
    if (selected == team1) {
      alert("Please select different Opponent");
      return;
    }
    team2 = selected;
    document.getElementById("team-2").innerText = selected;
  });
});

function goToToss() {
  document.getElementById("selectionScreen").style.display = "none";
  document.getElementById("coin-toss").style.display = "block";
  document.getElementById("my-Team").innerText = team1;
  document.getElementById("opp-Team").innerText = team2;
}

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

  battingTeam.innerText = batting + " Batting";
  bowlingTeam.innerText = bowling + " Bowling";
  document.getElementById("start-the-match").style.display = "block";
  document.getElementById("matchpage-header").innerText=batting+" Vs "+bowling;
}

document.getElementById("start-the-match").addEventListener("click", () => {
  document.getElementById("coin-toss").style.display = "none";
  document.getElementById("matchPage").style.display = "block";
});

function writeLine(text, cls) {
  let div = document.createElement("div");
  div.innerText = text;
  div.className = cls;
  battingOutput.appendChild(div);
  battingOutput.scrollTop = battingOutput.scrollHeight;
}

function startMatch() {
  currentTeam = 1;
  team1Score = 0;
  team2Score = 0;
  resetInnings();

  battingTeam.innerText = batting+" Batting";
  bowlingTeam.innerText = bowling+" Bowling";
  targetScore.innerText = "";

  playBtn.style.display = "inline-block";
  nextBtn.style.display = "none";

  writeLine("----"+ ((currentTeam==1)?batting : bowling) +" Innings Started ---- \n Runs / Wickets","end");
}


function playBall() {
  if (ballNo > 6 || wickets >= 2) {
    finishInnings();
    return;
  }

  let run = runs[Math.floor(Math.random()*runs.length)];
  let ball = balls[Math.floor(Math.random()*balls.length)];

  if (ball === "wide") {
    totalRuns += 1;
    writeLine("Ball "+ballNo+": "+totalRuns +" / "+wickets +" - WIDE"," wide");
    if(chaseScore!=-1 && totalRuns>=chaseScore){
        finishInnings();
        return;
    }
  }
  else if (ball === "noball") {
    totalRuns += (1+run);
    writeLine("Ball "+ballNo+": "+totalRuns +" / "+wickets+" - NO BALL !! "+run+" Runs","extra");
        if(chaseScore!=-1 && totalRuns>=chaseScore){
        finishInnings();
        return;
    }
  }
  else if (ball === "wicket") {
    wickets++;
    writeLine("Ball "+ballNo+": "+totalRuns +" / "+wickets+" - WICKET","wicket");
        if(chaseScore!=-1 && totalRuns>=chaseScore){
        finishInnings();
        return;
    }
    ballNo++;
  }
  else {
    totalRuns += run;
    writeLine("Ball "+ballNo+": "+totalRuns +" / "+wickets+" - "+run+" Runs","run");
    if(chaseScore!=-1 && totalRuns>=chaseScore){
        finishInnings();
        return;
    }
    ballNo++;
  }
}

function finishInnings() {
  playBtn.style.display = "none";

  if (currentTeam === 1) {
    team1Score = totalRuns;
    chaseScore=team1Score+1;
    writeLine("----"+batting+" Completed ----","end");
    writeLine("Final Score: "+team1Score,"end");
    nextBtn.style.display = "inline-block";
  } else {
    team2Score = totalRuns;
    writeLine("----"+bowling+" Completed ----","end");
    writeLine("Final Score: "+team2Score,"end");

    setTimeout(function () {
      window.location.href =
         "result.html?team1=" + team1Score + "&team2=" + team2Score + "&team1Name="+batting + "&team2Name="+bowling;
    }, 2000);
  }
}

function nextTeam() {
  currentTeam = 2;
  resetInnings();

  battingTeam.innerText =bowling +" Batting";
  bowlingTeam.innerText =batting+ " Bowling";

  targetScore.innerText =
    batting+" scored "+team1Score+". "+ bowling +" needs "+(team1Score+1)+" to win.";

  playBtn.style.display = "inline-block";
  nextBtn.style.display = "none";

  writeLine("----"+ bowling +" Innings Started ----","end");
}


function resetInnings() {
  totalRuns = 0;
  wickets = 0;
  ballNo = 1;
  battingOutput.innerHTML = "";
}
