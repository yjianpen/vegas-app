const INF=null;
class elliptic_curve{
	constructor(p,a,b,generator,kappa){
		this.p=p;
		this.a=a;
		this.b=b;
		this.generator=generator;
		this.kappa=kappa;
	}

	reduce_modp(x){
		return x%this.p;
	}

	equal_modp(x,y){
		return this.reduce_modp(x-y)==0;
	}

	inverse_modp(x,p){
		if (this.reduce_modp(x,this.p)){
			return INF;
		}

		return Math.pow(x, p -2)%p;
	}

	addition(P1,P2){
		if (P1 == INF){
			return P2;
		}

		if (P2 == INF){
			return P1;
		}

		let x1=P1[0];
		let x2=P1[1];
		let y1=P2[0];
		let y2=P2[1];

		if ((this.equal_modp(x1, x2)) && (this.equal_modp(y1, -y2))){
			return INF_POINT;
		}
		// Need to work on Veda's theorum and tangent line case
            
		


	}
}

const p1=new  elliptic_curve(13,2,0,[1,1],40);
console.log(p1.reduce_modp(4));
