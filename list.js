class MonsterList{
  constructor(elementConfig, diceResults){
    this.updatePreviousPage = this.updatePreviousPage.bind(this);
    this.displayRoll = this.displayRoll.bind(this);
    this.rollDice = this.rollDice.bind(this);
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
    this.buildNav = this.buildNav.bind(this);
    this.renderNav = this.renderNav.bind(this);
    this.domElements = {
      tableBody: $(elementConfig.tableBody),
      getMonsterButton: $(elementConfig.getMonsterButton),
      modalContent: $(elementConfig.modalContent),
      navPages: $(elementConfig.navPages)
    };
    this.diceResults = diceResults;
    this.list = {};
    this.nav = [];
    this.classList = {};
    this.monsters = [];
    this.monsterCalls = [];
    this.lastMonsterIndex = null;
    this.currentPage = 1;
    this.previousPage = 1;
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
    this.buildNav();
    this.renderNav();
    this.handleGetMonstersClick();
  }

  buildNav(){
    var totalMonsters = this.list.count;
    var numberOfPages = totalMonsters / 25;
    for(var i = 1; i <= numberOfPages; i++){
      var firstIndex;
      if(i==1){
        firstIndex = 0;
      }else{
        firstIndex = (i-1) * 25
      }
      var page = new PageIndex(i, firstIndex, {click: this.handleGetMonstersClick, update: this.updatePreviousPage});
      this.nav.push(page);
    }
  }

  renderNav(){
    var navBar = this.nav.map(v => v.renderPageIndex());
    this.domElements.navPages.empty().append(navBar);
  }

  getMonsterCountFail(error){
    console.error("Failed to get monster list", error);
  }

  handleGetMonstersClick(currentPage, firstIndex){
    var monsterIncrement = 24;
    var totalMonsters = this.list.count;
    var lastMonsterIndex = this.lastMonsterIndex;
    var monstersRemaining = (totalMonsters - 1) - lastMonsterIndex;
    var nextMonsterIndex;
    this.previousPage = this.currentPage;

    if(currentPage == undefined){
      this.currentPage = 1;
    }else{
      this.currentPage = currentPage;
    }

    if(firstIndex !== undefined){
      nextMonsterIndex = firstIndex;
    }

    if(monstersRemaining < monsterIncrement){
      monsterIncrement = monstersRemaining;
    }
    if (lastMonsterIndex == null || lastMonsterIndex == (totalMonsters - 1)){
      nextMonsterIndex = 0;
      monsterIncrement = 24;
    }else{
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
      var monsterUrl = "http://www.dnd5eapi.co" + monster.url;
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
    var newModal = new MonsterModal(monsterName, taco, {click: this.rollDice});
    var modalBody = newModal.renderModalContent();
    this.domElements.modalContent.empty().append(modalBody);
  }

  rollDice(modalObject){
    var randomRoll = this.diceResults[Math.floor(Math.random()*this.diceResults.length)];
    var roll = randomRoll.value;
    var response = randomRoll.response;
    this.displayRoll(roll, response, modalObject);
  }

  displayRoll(roll, response, modalObject){
    var modal = modalObject;
    modal.displayRollResults(roll, response);
  }

  updatePreviousPage(){
    for(var i = 0; i <this.nav.length; i++){
      var nav = this.nav[i];
      if(nav.pageNumber == this.previousPage){
        nav.removeActiveClass();
      }
    }
  }
}
