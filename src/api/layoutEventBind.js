export function bindKeyup(e, _this) {
  if(e.key == 'Backspace' || e.key == 'Delete'){
    if(_this.curItem.index != undefined){
      _this.list.splice(_this.curItem.index, 1)
      _this.reOrderList()
      _this.curItem = {}
    }
  }
  if(e.key == 'Escape'){
    if(_this.curItem.index != undefined){
      _this.curItem = {}
    }
  }
}