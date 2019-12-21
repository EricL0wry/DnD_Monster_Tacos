$(document).ready(initializeListPage);

var monsterList;

function initializeListPage() {

  monsterList = new MonsterList({
    tableBody: "#monster-table",
    getMonsterButton: "#get-monsters",
    modalContent: "#modal-content"
  })

  monsterList.getMonsterListFromServer();
}
