class MonsterList{
  constructor(elementConfig){
    this.renderModal = this.renderModal.bind(this);
    this.processResponseForModal = this.processResponseForModal.bind(this);
    this.getTacoFromServer = this.getTacoFromServer.bind(this);
    this.getClassesFromServer = this.getClassesFromServer.bind(this);
    this.handleGetTaco = this.handleGetTaco.bind(this);
    this.processMonstersFromServer = this.processMonstersFromServer.bind(this);
    this.gatherMonsterCalls = this.gatherMonsterCalls.bind(this);
    this.renderAllMonsters = this.renderAllMonsters.bind(this);
    this.addMonsters = this.addMonsters.bind(this);
    this.getMonsterDetailsFromServer = this.getMonsterDetailsFromServer.bind(this);
    this.handleGetMonstersClick = this.handleGetMonstersClick.bind(this);
    this.getMonsterCount = this.getMonsterCount.bind(this);
    this.getMonsterCountFail = this.getMonsterCountFail.bind(this);
    this.addEventHandlers = this.addEventHandlers.bind(this);
    this.domElements = {
      tableBody: $(elementConfig.tableBody),
      getMonsterButton: $(elementConfig.getMonsterButton),
      modalContent: $(elementConfig.modalContent)
    };
    this.list = {};
    this.classList = {};
    this.monsters = [];
    this.monsterCalls = [];
    this.lastMonsterIndex = null;
  }

  addEventHandlers(){
    this.domElements.getMonsterButton.click(this.handleGetMonstersClick);
    this.domElements.getMonsterButton.text("GET 25 MONSTERS!")
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
    this.addEventHandlers();
  }

  getMonsterCountFail(error){
    console.error("Failed to get monster list", error);
  }

  handleGetMonstersClick(){
    var totalMonsters = this.list.count;
    var lastMonsterIndex = this.lastMonsterIndex;
    var monstersRemaining = (totalMonsters - 1) - lastMonsterIndex;
    var nextMonsterIndex;
    var monsterIncrement = 24;

    if (this.domElements.getMonsterButton.text() == "START OVER"){
      this.domElements.getMonsterButton.text("GET 25 MONSTERS!");

    }
    if(monstersRemaining <= 25 && monstersRemaining > 0){
      this.domElements.getMonsterButton.text("START OVER");
    }

    if(monstersRemaining < monsterIncrement){
      monsterIncrement = monstersRemaining;
    }

    if (lastMonsterIndex == null || lastMonsterIndex == (totalMonsters - 1)){
      nextMonsterIndex = 0;
      monsterIncrement = 24;
    }else{
      nextMonsterIndex = lastMonsterIndex + 1;
      this.lastMonsterIndex += monsterIncrement;
    }
    this.getMonsterDetailsFromServer(nextMonsterIndex, monsterIncrement);
  }

  getMonsterDetailsFromServer(nextIndex, increment){
    var monsterCalls = this.gatherMonsterCalls(nextIndex, increment);
    Promise.all(monsterCalls).then((results) => {this.processMonstersFromServer(results)});
  }

  gatherMonsterCalls(nextIndex, increment){
    var lastIndex = (nextIndex + increment);
    var monsterCalls = [];
    for (var i = nextIndex; i <= lastIndex; i++) {
      var monster = this.list.results[i];
      var monsterUrl = monster.url
      monsterCalls.push($.ajax({
        url: monsterUrl,
        method: "get",
        dataType: "json"
      }));
    }
    this.lastMonsterIndex = lastIndex;
    return monsterCalls;
  }

  processMonstersFromServer(monsterDetails){
    this.addMonsters(monsterDetails);
    this.renderAllMonsters();
  }

  addMonsters(monsterDetails){
    var monsterDetailsArray = monsterDetails;
      for(var i = 0; i < monsterDetailsArray.length; i++){
        var newMonster = new Monster(monsterDetailsArray[i], {click: this.handleGetTaco});
        this.monsters.push(newMonster);
    }
  }

  renderAllMonsters(){
    var monsters = this.monsters.map(v => v.renderMonsterItem());
    this.domElements.tableBody.empty().append(monsters);
    this.monsters = [];
  }

  handleGetTaco(monsterName){
    var monster = monsterName;
    var taco = this.getTacoFromServer();
    var classes = this.getClassesFromServer();
    Promise.all([taco, classes]).then((results) => { this.processResponseForModal(results, monster)});
  }

  getTacoFromServer() {
    return $.ajax({
      url: "http://taco-randomizer.herokuapp.com/random/?full-taco=true",
      method: "get"
    })
  }

  getClassesFromServer() {
    return $.ajax({
      url: "http://www.dnd5eapi.co/api/classes",
      method: "get",
      dataType: "json"
    })
  }

  processResponseForModal(results, monsterName){
    var tacoResponse = results[0];
    var classesResponse = results[1];
    var tacoName = tacoResponse.name;
    var randomClassItem = classesResponse.results[Math.floor(Math.random()*classesResponse.results.length)];
    var randomClass = randomClassItem.name;
    var taco = `${randomClass} and ${tacoName}`;

    this.renderModal(monsterName, taco);
  }

  renderModal(monsterName, taco){
    var newModal = new MonsterModal(monsterName, taco);
    var modalBody = newModal.renderModalContent();
    this.domElements.modalContent.empty().append(modalBody);
  }
}
