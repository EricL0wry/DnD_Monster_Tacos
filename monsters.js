class Monster{
  constructor(data, callbacks){
    render
    this.callbacks = callbacks;
    this.domElements = {
      list: {}
    }
  }


  renderMonsterItem() {

    var $monsterRow = this.domElements.list.monsterRow = $("<tr>", {class: "monster-row"});
    var $monsterName = this.domElements.list.monsterName = $("<td>", { class: "monster-name", text: "Adult Copper Dragon"});
    var $monsterType = this.domElements.list.monsterType = $("<td>", {class: "monster-type", text: "dragon"});
    var $monsterSize = this.domElements.list.monsterSize = $("<td>", {class: "monster-size", text: "huge"});
    var $monsterAlignment = this.domElements.list.monsterAlignment = $("<td>", {class: "monster-alignment", text: "chaotic good"});
    var $monsterHp = this.domElements.list.monsterHp = $("<td>", {class: "monster-hp", text: "184"});
    var $buttonContainer = this.domElements.list.buttonContainer = $("<td>", {class: "button-container"});
    var $getTacoButton = this.domElements.list.getTacoButton = $("<button>", {type: "button", class: "btn btn-danger get-taco", text: "Get Taco!"});

    $buttonContainer.append($getTacoButton);
    $monsterRow.append($monsterName, $monsterType, $monsterSize, $monsterAlignment, $monsterHp, $buttonContainer);

    return $monsterRow;
  }
}
