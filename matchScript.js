let params=new URLSearchParams(window.location.search);
let batting=params.get("batting");
let bowling=params.get("bowling");

let balls = [
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
  "noball",
  "normal",
  "normal",
  "normal",
  "normal",
  "wide",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
  "wicket",
  "normal",
  "normal",
  "normal",
];
let runs = [0, 1, 2, 3, 4, 6];
let chaseScore=-1;
let totalRuns = 0;
let wickets = 0;
let ballNo = 1;
let team1Score = 0;
let team2Score = 0;
let freehit=false;

const battingOutput = document.getElementById("battingOutput");
const battingTeam = document.getElementById("battingTeam");
const bowlingTeam = document.getElementById("bowlingTeam");
const targetScore = document.getElementById("targetScore");

battingTeam.innerText = batting + " Batting";
bowlingTeam.innerText = bowling + " Bowling";
document.getElementById("matchpage-header").innerText=batting+" Vs "+bowling;



let playBtn = document.getElementById("playBtn");
playBtn.style.display="none";
let nextBtn = document.getElementById("nextBtn");
nextBtn.style.display = "none";

function writeLine(text, cls) {
  let div = document.createElement("div");
  div.innerText = text;
  div.className = cls;
  battingOutput.appendChild(div);
  battingOutput.scrollTop = battingOutput.scrollHeight;
}

function startMatch() {
  document.getElementById("startbutton").style.display="none";
  playBtn.style.display="block";
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
    
    let run = runs[Math.floor(Math.random()*runs.length)];
    let ball = balls[Math.floor(Math.random()*balls.length)];
    
    if (ball === "wide") {
        totalRuns += 1;
        if(freehit==false) writeLine("Ball "+ballNo+": "+totalRuns +" / "+wickets +" - WIDE"," wide");
        else{
            writeLine("Ball "+ballNo+": "+totalRuns +" / "+wickets +" - WIDE  FREEHIT !!","freehit");
        }
        if(chaseScore!=-1 && totalRuns>=chaseScore){
            finishInnings();
            return;
        }
    }
    else if (ball === "noball") {
        totalRuns += (1+run);
        freehit=true;
        writeLine("Ball "+ballNo+": "+totalRuns +" / "+wickets+" - NO BALL !! "+run+" Runs","extra");
        if(chaseScore!=-1 && totalRuns>=chaseScore){
            finishInnings();
            return;
        }
    }
    else if (ball === "wicket") {
        if(freehit==false){
           wickets++;
           writeLine("Ball "+ballNo+": "+totalRuns +" / "+wickets+" - WICKET","wicket");
       }
       else{ 
        if(run>=0 && run <=3){
             totalRuns+=run;
             writeLine("Ball "+ballNo+": "+totalRuns +" / "+wickets+" - FREE HIT !! "+run+" Runs","freehit");
        }
       }
        if(chaseScore!=-1 && totalRuns>=chaseScore){
            finishInnings();
            return;
        }
        ballNo++;
    }
    else {
        totalRuns += run;
        if(freehit==false) writeLine("Ball "+ballNo+": "+totalRuns +" / "+wickets+" - "+run+" Runs","run");
        else {
            writeLine("Ball "+ballNo+": "+totalRuns +" / "+wickets+" - "+run+" Runs  FREEHIT !!","freehit");
            freehit=false;
        }
        if(chaseScore!=-1 && totalRuns>=chaseScore){
            finishInnings();
            return;
        }
        ballNo++;
    }
    if (ballNo > 6 || wickets >= 2) {
      finishInnings();
      return;
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
