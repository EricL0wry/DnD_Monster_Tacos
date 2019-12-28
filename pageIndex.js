class PageIndex{
  constructor(pageNumber, firstIndex, callbacks){
    this.removeActiveClass = this.removeActiveClass.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.renderPageIndex = this.renderPageIndex.bind(this);
    this.pageNumber = pageNumber;
    this.firstIndex = firstIndex;
    this.callbacks = callbacks;
    this.domElements = {};
  }

  renderPageIndex(){
    var $pageItem = this.domElements.pageItem = $("<li>", {class: "page-item"});
    if(this.pageNumber == 1){
      $pageItem.addClass("active");
    }

    var $pageLink = this.domElements.pageLink = $("<a>", {class: "page-link", text: this.pageNumber});

    $pageItem.click(this.handlePageClick);

    $pageItem.append($pageLink);
    return $pageItem;
  }

  handlePageClick(){
    this.callbacks.click(this.pageNumber, this.firstIndex);
    this.domElements.pageItem.addClass("active");
    this.callbacks.update()
  }

  removeActiveClass(){
    this.domElements.pageItem.removeClass("active");
  }

}
