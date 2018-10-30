var qualityEnum = {	"Simple":1,
				  	"Unusual":2,
				  	"Extraordinary":3,
				  	"Set":4,
				  	"Mythical":5};

var calculationEnum = {	"Additive":0,
					   	"Multiplicative":1};
var guaranteedRandomEnum = {"Guaranteed": 0,
					 	    "Random":1};

var baseValueNames = ["CritChance", "CritDamage", "ElementalDamage", "PhysicalDamage", "ColdDamage", "FireDamage", "PoisonDamage", "PhysicalResist", "ColdResist", 									"FireResist", "PoisonResist", "Health", "LifeOnHit",
					  "LifeOnKill", "LifeBonus", "Energy", "EnergyRegen", "EnergyCostReduction", "EnergyOnHit"];

var mainValueNames = ["WeaponDamage", "AttackSpeed", "Armor", "MovementSpeed"];

var damageTypeEnum = {"FireDamage":0, "ColdDamage":1, "PoisonDamage":2, "PhysicalDamage":3};

var ItemTypeEnum = {"BodyArmor":1,
				   	"Boots":2,
				   	"Helmet":3,
				   	"Trigger":4,
				   	"LoadingMechanism":5,
				   	"FiringMechanism":6,
				   	"EnergyContainer":7,
				   	"Barrel":8,
				   	"AmmoClip":9,
				   	"Stock":10,
				   	"BarrelAttachment":11,
				   	"Scope":12,
				   	"CosmeticAttachment":13,
				   	"BossAbilityItem":14};

//the actual numerical range of a statitstic and its calculation type
class StatisticValue {
	//minimum roll, maximum roll, additive or multiplicative?
	constructor(valueMin, valueMax, calculationType, guaranteedOrRandom){
		this.valueMin = valueMin;
		this.valueMax = valueMax;
		this.calculationType = calculationType;
		this.guaranteedOrRandom = guaranteedOrRandom;
	}
} 

class ItemStats {
	constructor( CritChance, CritDamage, ElementalDamage, PhysicalDamage, ColdDamage, FireDamage, PoisonDamage, PhysicalResist, ColdResist, FireResist, PoisonResist, Health, LifeOnHit, LifeOnKill, LifeBonus, Energy, EnergyRegen, EnergyCostReduction, EnergyOnHit){
		this.CritChance = CritChance;
		this.CritDamage = CritDamage;
		this.ElementalDamage = ElementalDamage;
		this.PhysicalDamage = PhysicalDamage;
		this.ColdDamage = ColdDamage;
		this.FireDamage = FireDamage;
		this.PoisonDamage = PoisonDamage;
		this.PhysicalResist = PhysicalResist;
		this.ColdResist = ColdResist;
		this.FireResist = FireResist;
		this.PoisonResist = PoisonResist;
		this.Health = Health;
		this.LifeOnHit = LifeOnHit;
		this.LifeOnKill = LifeOnKill;
		this.LifeBonus = LifeBonus;
		this.Energy = Energy;
		this.EnergyRegen = EnergyRegen;
		this.EnergyCostReduction = EnergyCostReduction;
		this.EnergyOnHit = EnergyOnHit;
		
	}
}



class WeaponPartStats extends ItemStats{
	constructor( CritChance, CritDamage, ElementalDamage, PhysicalDamage, ColdDamage, FireDamage, PoisonDamage, PhysicalResist, ColdResist, FireResist, PoisonResist, Health, LifeOnHit, LifeOnKill, LifeBonus, Energy, EnergyRegen, EnergyCostReduction, EnergyOnHit, WeaponDamage, AttackSpeed){
		super(CritChance, CritDamage, ElementalDamage, PhysicalDamage, ColdDamage, FireDamage, PoisonDamage, PhysicalResist, ColdResist, FireResist, PoisonResist, Health, LifeOnHit, LifeOnKill, LifeBonus, Energy, EnergyRegen, EnergyCostReduction, EnergyOnHit);
		
		this.WeaponDamage = WeaponDamage;
		this.AttackSpeed = AttackSpeed;
	}
}

class ArmorStats extends ItemStats{
	constructor( CritChance, CritDamage, ElementalDamage, PhysicalDamage, ColdDamage, FireDamage, PoisonDamage, PhysicalResist, ColdResist, FireResist, PoisonResist, Health, LifeOnHit, LifeOnKill, LifeBonus, Energy, EnergyRegen, EnergyCostReduction, EnergyOnHit, Armor){
		super(CritChance, CritDamage, ElementalDamage, PhysicalDamage, ColdDamage, FireDamage, PoisonDamage, PhysicalResist, ColdResist, FireResist, PoisonResist, Health, LifeOnHit, LifeOnKill, LifeBonus, Energy, EnergyRegen, EnergyCostReduction, EnergyOnHit);
		
		this.Armor = Armor;
	}
		
}

class ShoeStats extends ArmorStats{
	constructor( CritChance, CritDamage, ElementalDamage, PhysicalDamage, ColdDamage, FireDamage, PoisonDamage, PhysicalResist, ColdResist, FireResist, PoisonResist, Health, LifeOnHit, LifeOnKill, LifeBonus, Energy, EnergyRegen, EnergyCostReduction, EnergyOnHit, Armor, MovementSpeed){
		super(CritChance, CritDamage, ElementalDamage, PhysicalDamage, ColdDamage, FireDamage, PoisonDamage, PhysicalResist, ColdResist, FireResist, PoisonResist, Health, LifeOnHit, LifeOnKill, LifeBonus, Energy, EnergyRegen, EnergyCostReduction, EnergyOnHit, Armor);
		
		this.MovementSpeed = MovementSpeed;
	}
}

class UniqueSecondaryEffect{
	constructor(EffectName, EffectDescription){
		this.EffectName = EffectName;
		this.EffectDescription = EffectDescription;
	}
}

//generates random id
var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

//base item
class Item {
	
	constructor(name, description, quality, minimumLevel, durability, itemType, randomCount){
		this.name = name;
		this.description = description;
		this.quality = quality;
		this.minimumLevel = minimumLevel;
		this.durability = durability;
		this.health = durability;
		if(!this.id){
			this.id = ID();
		}
		this.itemType = itemType;
		this.randomCount = randomCount;
	}
}

//armor parts
class BodyArmor extends Item{constructor(name, description, quality, minimumLevel, durability, randomCount, Statistics, UniqueSecondary){super(name,description,quality,minimumLevel,durability, 0 , randomCount); this.Statistics = Statistics; this.UniqueSecondary = UniqueSecondary;}}
class Boots extends Item{constructor(name, description, quality, minimumLevel, durability, randomCount, Statistics, UniqueSecondary){super(name,description,quality,minimumLevel,durability, 1, randomCount); this.Statistics = Statistics; this.UniqueSecondary = UniqueSecondary;}}
class Helmet extends Item{constructor(name, description, quality, minimumLevel, durability, randomCount, Statistics, UniqueSecondary){super(name,description,quality,minimumLevel,durability, 2, randomCount); this.Statistics = Statistics; this.UniqueSecondary = UniqueSecondary;}}

//required weapon parts
class Trigger extends Item{constructor(name, description, quality, minimumLevel, durability, randomCount, Statistics, UniqueSecondary){super(name,description,quality,minimumLevel,durability, 3, randomCount); this.Statistics = Statistics; this.UniqueSecondary = UniqueSecondary;}}
class LoadingMechanism extends Item{constructor(name, description, quality, minimumLevel, durability, randomCount, Statistics, UniqueSecondary, damageType){super(name,description,quality,minimumLevel,durability, 4, randomCount); this.Statistics = Statistics; this.UniqueSecondary = UniqueSecondary; this.damageType = damageType}}
class FiringMechanism extends Item{constructor(name, description, quality, minimumLevel, durability, randomCount, Statistics, UniqueSecondary){super(name,description,quality,minimumLevel,durability, 5, randomCount); this.Statistics = Statistics; this.UniqueSecondary = UniqueSecondary;}}
class EnergyContainer extends Item{constructor(name, description, quality, minimumLevel, durability, randomCount, Statistics, UniqueSecondary){super(name,description,quality,minimumLevel,durability, 6, randomCount); this.Statistics = Statistics; this.UniqueSecondary = UniqueSecondary;}}
class Barrel extends Item{constructor(name, description, quality, minimumLevel, durability, randomCount, Statistics, UniqueSecondary){super(name,description,quality,minimumLevel,durability, 7, randomCount); this.Statistics = Statistics; this.UniqueSecondary = UniqueSecondary;}}

//optional weapon parts
class AmmoClip extends Item{constructor(name, description, quality, minimumLevel, durability, randomCount, Statistics, UniqueSecondary){super(name,description,quality,minimumLevel,durability, 8, randomCount); this.Statistics = Statistics; this.UniqueSecondary = UniqueSecondary;}}
class Stock extends Item{constructor(name, description, quality, minimumLevel, durability, randomCount, Statistics, UniqueSecondary){super(name,description,quality,minimumLevel,durability, 9, randomCount); this.Statistics = Statistics; this.UniqueSecondary = UniqueSecondary;}}
class BarrelAttachment extends Item{constructor(name, description, quality, minimumLevel, randomCount, durability, Statistics, UniqueSecondary){super(name,description,quality,minimumLevel,durability, 10, randomCount); this.Statistics = Statistics; this.UniqueSecondary = UniqueSecondary;}}
class Scope extends Item{constructor(name, description, quality, minimumLevel, durability, randomCount, Statistics, UniqueSecondary){super(name,description,quality,minimumLevel,durability, 11, randomCount); this.Statistics = Statistics; this.UniqueSecondary = UniqueSecondary;}}
class CosmeticAttachment extends Item{constructor(name, description, quality, minimumLevel,  durability, randomCount, Statistics, UniqueSecondary){super(name,description,quality,minimumLevel,durability, 12, randomCount); this.Statistics = Statistics; this.UniqueSecondary = UniqueSecondary;}}
class BossAbilityItem extends Item {constructor(name, description, quality, minimumLevel,  durability, randomCount, Statistics, UniqueSecondary){super(name,description,quality,minimumLevel,durability, 13, randomCount); this.Statistics = Statistics; this.UniqueSecondary = UniqueSecondary;}}
