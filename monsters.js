class Monster{
  constructor(monsterDetails, callbacks){
    this.handleGetTacoClick = this.handleGetTacoClick.bind(this);
    this.renderMonsterItem = this.renderMonsterItem.bind(this);
    this.callbacks = callbacks;
    this.domElements = {
      list: {}
    };
    this.monsterDetails = monsterDetails;
  }

  renderMonsterItem() {
    var $monsterRow = this.domElements.list.monsterRow = $("<tr>", {class: "monster-row"});
    var $monsterName = this.domElements.list.monsterName = $("<td>", { class: "monster-name", text: this.monsterDetails.name});
    var $monsterType = this.domElements.list.monsterType = $("<td>", {class: "monster-type", text: this.monsterDetails.type});
    var $monsterSize = this.domElements.list.monsterSize = $("<td>", {class: "monster-size", text: this.monsterDetails.size});
    var $monsterAlignment = this.domElements.list.monsterAlignment = $("<td>", {class: "monster-alignment", text: this.monsterDetails.alignment});
    var $monsterHp = this.domElements.list.monsterHp = $("<td>", {class: "monster-hp", text: this.monsterDetails.hit_points});
    var $buttonContainer = this.domElements.list.buttonContainer = $("<td>", {class: "button-container"});
    var $getTacoButton = this.domElements.list.getTacoButton = $("<button>", {
      type: "button",
      class: "btn btn-danger get-taco",
      "data-toggle": "modal",
      "data-target": "#taco-modal",
      text: "Get Taco!"});

    $getTacoButton.click(this.handleGetTacoClick);
    $buttonContainer.append($getTacoButton);
    $monsterRow.append($monsterName, $monsterType, $monsterSize, $monsterAlignment, $monsterHp, $buttonContainer);

    return $monsterRow;
  }

  handleGetTacoClick(){
    this.callbacks.click(this.monsterDetails.name);
  }
}
