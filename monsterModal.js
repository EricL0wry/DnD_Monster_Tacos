class MonsterModal{
  constructor(monsterName, taco, callbacks){
    this.handleRollClick = this.handleRollClick.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.domElements = {};
    this.monsterName = monsterName;
    this.taco = taco;
    this.callbacks = callbacks
  }

  renderModalContent(){

    var $modalBody = this.domElements.modalBody = $("<div>", {class: "modal-body", id: "modal-body"});
    var $modalClose = this.domElements.modalClose = $("<button>", {type: "button", class: "close", "data-dismiss": "modal", "aria-label": "Close"});
    var $close = $("<span>", { "aria-hidden": "true", text: "close"});
    $modalClose.append($close);
    var $monsterIntro = this.domElements.monsterIntro = $("<h3>", {class: "monsterIntro", text: `Your ${this.monsterName} gets....`});
    var $monsterTaco = this.domElements.monsterTaco = $("<h2>", {class: "monsterTaco", text: this.taco});
    var $monsterOutro = this.domElements.monsterOutro = $("<h3>", { class: "lead monsterOutro", text: `Roll a 1d20 to see if the ${this.monsterName} likes the taco`});
    var $rollButton = this.domElements.rollButton = $("<button>", {
      class: "btn-danger modalButton",
      text: "Roll 1d20"
    })

    $rollButton.click(this.handleRollClick);

    $modalBody.append($modalClose, $monsterIntro, $monsterTaco, $monsterOutro, $rollButton);

    return $modalBody;
  }

  handleRollClick(){
    this.callbacks.click(this)
  }

  displayRollResults(value, response){
    this.domElements.monsterOutro.text(`You rolled a ${value}. ${response}`);
  }
}
