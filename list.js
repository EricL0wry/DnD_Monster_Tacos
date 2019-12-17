class MonsterList{
  constructor(elementConfig){
    this.handleGetMonstersClick = this.handleGetMonstersClick.bind(this);
    this.getMonsterCount = this.getMonsterCount.bind(this);
    this.getMonsterCountFail = this.getMonsterCountFail.bind(this);
    this.domElements = {
      tableBody: $(elementConfig.tableBody),
      getMonsterButton: $(elementConfig.getMonsterButton)
    };
    this.list = {};
    this.lastMonsterIndex = null;
  }

  addEventHandlers(){
    this.domElements.getMonsterButton.click(this.handleGetMonstersClick);
  }

  getMonsterListFromServer() {
    $.ajax({
      url: "http://www.dnd5eapi.co/api/monsters",
      method: "get",
      dataType: "json"
    }).done(this.getMonsterCount).fail(this.getMonsterCountFail);
  }

  getMonsterCount(response){
    this.list = response;
  }

  getMonsterCountFail(error){
    console.error("Failed to get monster list", error);
  }


  handleGetMonstersClick(){
    var totalMonsters = this.list.count;
    var lastMonsterIndex = this.lastMonsterIndex;
    var monstersRemaining = (totalMonsters - 1) - lastMonsterIndex;
    var nextMonsterIndex;
    var monsterIncrement = 25;

    if(monstersRemaining <= 25){
      //update button to say start over
    }

    if(monstersRemaining < monstersIncrement){
      monsterIncrement = monstersRemaining;
    }

    if (lastMonsterIndex == null || lastMonsterIndex == (totalMonsters - 1)){
      nextMonsterIndex = 0;
      this.lastMonsterIndex = 24;
    }else{
      nextMonsterIndex = lastMonsterIndex + 1;
      this.lastMonsterIndex += monsterIncrement;
    }

    this.processMonsters(nextMonsterIndex, monsterIncrement);

  }

  processMonsters(nextIndex, increment){
    //loop through indexes passed in, ajax call for each one
  }
}
