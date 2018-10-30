// Item Set


class ItemSet{
	constructor(Description, Name, SetBoniList){
		this.name = Name;
		this.description = Description;
		this.itemList = [];
		if(!this.id){
			this.id = ID();
		} 
		this.setBoniList = SetBoniList;
	}
	
	addItem(item){
		if(this.itemList.contains(item))
			return;
		this.itemList.push(item);
	}
	
	removeItem(item){
		if(!this.itemList.contains(item))
			return;
		
		this.itemList.remove(item);
	}
}