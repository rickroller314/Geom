class Geom extends Number{
	//"5:0+7:10+-8:110"
	constructor(terms){
		super();
		this.terms = {};
		if(typeof terms == "string"){
			for(var term of terms.split("+")){
				term = term.split(":");
				this.addTerm(parseFloat(term[0]), parseInt(term[1], 2));
			}
		}else if(typeof terms == "number"){
			this.addTerm(terms, 0);
		}else if(terms instanceof Geom){
			for(var e in terms.terms){
				this.terms[e] = terms.terms[e];
			}
		}else if(terms == undefined){
		}else{
			throw(new Error("conversion not supported"));
		}
	}
	get clone(){
		return new Geom(this);
	}
	set clone(int){
		if(int == 1){
			this.terms = Geom.multiply(...Geom.storage).terms;
		}else{
			this.terms = Geom.add(...Geom.storage).terms;
		}
		Geom.storage = [];
	}
	get magnitude(){
		return Math.hypot(...Object.values(this.terms));
	}
	toString(){
		let string = "";
		for(let i in this.terms){
			if(this.terms[i]){
				string+="+"+this.terms[i].toString(10)+":"+parseInt(i).toString(2);
			}
		}
		return (string=="")?"0":string.slice(1);
	}
	addTerm(scalar, e){
		if(scalar){
			this.terms[e] = this.terms[e]||0;
			this.terms[e]+=scalar;
		}
		return this;
	}
	equal(geom){
		return this.toString() == Geom.from(geom).toString();
	}
	add(geom){
		geom = Geom.from(geom);
		this.length = geom.length;
		for(let i in geom.terms){
			this.terms[i] = this.terms[i] || 0;
			this.terms[i] += geom.terms[i];
			if(this.terms[i] == 0) delete this.terms[i];
		}
		return this;
	}
	multiply(geom){
		let temp = new Geom();
		geom = Geom.from(geom);
		for(let i in this.terms){
			for(let j in geom.terms){
				temp.addTerm(...Geom.multiplyTerms(this.terms[i], parseInt(i), geom.terms[j], parseInt(j)));
			}
		}
		this.terms = temp.terms;
		return this;
	}
	valueOf(){
		Geom.storage.push(this);
		return 1;
	}
	static from(terms){
		return new Geom(terms);
	}
	static equal(...geoms){
		let string = Geom.from(geoms[0]).toString();
		for(let input of geoms){
			if(string!==Geom.from(input).toString()) return false;
		}
		return true;
	}
	static add(...geoms){
		let accum = new Geom(0);
		for(let input of geoms){
			accum.add(Geom.from(input));
		}
		return accum;
	}
	static multiply(...geoms){
		let accum = new Geom(1);
		for(let input of geoms){
			let geom = Geom.from(input);
			accum.multiply(geom);
		}
		return accum;
	}
	static multiplyTerms(leftScalar, leftE, rightScalar, rightE){
		if(leftScalar*rightScalar){
			let polarity = false;
			let polarValue = 0;
			for(let i = 0; i < rightE.toString(2).split("0").join("").length; i++){
				polarity^=(leftE>>i)&1;
				polarValue|=polarity<<i;
			}
			polarValue&=rightE>>1;
			return [
				leftScalar*rightScalar*((polarValue.toString(2).split("0").join("").length&1)*-2+1),
				leftE^rightE
			];
		}
		return [0, 0];
	}
}
Geom.storage = [];