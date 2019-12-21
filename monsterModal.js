class MonsterModal{
  constructor(monsterName, taco){
    this.renderModalContent = this.renderModalContent.bind(this);
    this.domElements = {};
    this.monsterName = monsterName;
    this.taco = taco
  }

  renderModalContent(){

    var $modalBody = this.domElements.modalBody = $("<div>", {class: "modal-body", id: "modal-body"});
    var $monsterIntro = this.domElements.monsterIntro = $("<h3>", {class: "monsterIntro", text: `Your ${this.monsterName} gets`});
    var $monsterTaco = this.domElements.monsterTaco = $("<h2>", {class: "monsterTaco", text: this.taco});
    var $monsterOutro = this.domElements.monsterOutro = $("<h3>", {class: "lead monsterOutro", text: "This taco was a critical fail. You have died."});
    var $modalButton = this.domElements.modalButton = $("<button>", {
      class: "btn-danger modalButton",
      "data-dismiss": "modal",
      text: "Close"
    })

    $modalBody.append($monsterIntro, $monsterTaco, $monsterOutro, $modalButton);

    return $modalBody;
  }
}
