  let params = new URLSearchParams(window.location.search);
  let t1 = parseInt(params.get("team1"));
  let t2 = parseInt(params.get("team2"));
  let team1Name=params.get("team1Name");
  let team2Name=params.get("team2Name");

  let result =
    t1 > t2 ? "🏆"+team1Name+" WINS!" :
    t2 > t1 ? "🏆 "+team2Name+" WINS!" :
    "🤝 MATCH TIED!";

  document.getElementById("resultText").innerText = result;
  document.getElementById("scoreText").innerText =
    team1Name+": " + t1 + " | "+team2Name+": " + t2

  function goBack() {
    window.location.href = "index.html";
  }