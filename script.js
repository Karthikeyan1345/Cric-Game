let team1 = "CSK";
let team2 = "KKR";


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

document.querySelector("#selectionScreen .toss-btn").addEventListener("click",()=>{
  window.location.href=
   "coin-toss.html?team1Name=" + team1 + "&team2Name=" + team2 ;
})

