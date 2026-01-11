  let params = new URLSearchParams(window.location.search);
  let t1 = parseInt(params.get("team1"));
  let t2 = parseInt(params.get("team2"));

  let result =
    t1 > t2 ? "🏆 TEAM 1 WINS!" :
    t2 > t1 ? "🏆 TEAM 2 WINS!" :
    "🤝 MATCH TIED!";

  document.getElementById("resultText").innerText = result;
  document.getElementById("scoreText").innerText =
    "Team 1: " + t1 + " | Team 2: " + t2;

  function goBack() {
    window.location.href = "index.html";
  }