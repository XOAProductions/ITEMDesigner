// Item Set


class ItemSet{
	constructor(Description, Name, SetBoniList){
		this.name = Name;
		this.description = Description;
		this.itemIDList = [];
		if(!this.id){
			this.id = ID();
		} 
		this.setBoniList = SetBoniList;
		
	}
	
	addItemID(itemID){
		if(this.itemIDList.includes(itemID))
			return;
		this.itemIDList.push(itemID);
	}
	
	removeItem(itemID){
		if(!this.itemIDList.includes(itemID))
			return;
		
		this.itemIDList.remove(itemID);
	}
}