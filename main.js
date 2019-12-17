$(document).ready(initializeListPage);

var monsterList;

function initializeListPage() {
  console.log("page loaded");

  monsterList = new MonsterList({
    tableBody: "#monster-table",
    getMonsterButton: "#get-monsters"
  })

  monsterList.getMonsterListFromServer();
  monsterList.addEventHandlers();
  // monsterList.renderMonsterListItem();

}
