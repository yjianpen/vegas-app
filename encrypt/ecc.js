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
		let res = x%this.p;
		while (res<0){
			res+=this.p;
		}
		return res;
	}

	equal_modp(x,y){
		return this.reduce_modp(x-y)==0;
	}

	inverse_modp(x,p){
		if (this.reduce_modp(x) == 0){
            return INF;
		}
		//console.log("Inverse")
		let res =  Math.pow(x, p -2)%p;
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
		let x2=P2[0];
		let y1=P1[1];
		let y2=P2[1];

		if ((this.equal_modp(x1, x2)) && (this.equal_modp(y1, -y2))){
			return INF;
		}
		// Need to work on Veda's theorum and tangent line case
		// Tangent line case

		var u;
        if (this.equal_modp(x1,x2) && this.equal_modp(y1,y2)){
        	console.log("tangent line" + String((3 * x1 * x1 + this.a))+" , "+String(this.inverse_modp(2 * y1,this.p)))
        	console.log("prime val",this.p)
        	u = this.reduce_modp((3 * x1 * x1 + this.a) * this.inverse_modp(2 * y1,this.p));
        }
        else{
        	console.log("not tangent line!",(x1-x2)%this.p,P1[0],x1,P2[0],x2)
        	u = this.reduce_modp((y1 - y2) * this.inverse_modp(x1 - x2,this.p));
        }

        let v = this.reduce_modp(y1 - u * x1);

        let x3 = this.reduce_modp(u * u - x1 - x2);

        let y3 = this.reduce_modp(-u * x3 - v);

        let newpoint= [x3,y3];
        return newpoint;
		
	}
	multiple(k,P){
		let Q = INF;
		while (k!=0){
			if ((k & 1)!=0){
				Q = this.addition(Q,P);
			}

			P = this.addition(P,P);

			k>>=1;

		}
		return Q;
	}

	is_point_on_curve(x,y){
		return this.equal_modp(y * y, x * x * x + this.a * x + this.b);
	}

	reverse(P){
		if (P==INF){
			return P;
		}
		return [x[0],-x[1]];
	}

	ecdsa_generate(private_key){
		return this.multiple(private_key,this.generator);
	}

	ecdsa_verify(public_key,private_key){
		return this.equal_modp(this.multiple(private_key,this.generator),public_key);
	}
}
//y^2=x^3+2x+6
G = [1,3];
const p1 = new  elliptic_curve(13,2,6,[1,3],40);
console.log(p1.reduce_modp(4));
console.log(p1.addition(p1.generator,p1.generator));
console.log(p1.multiple(3,p1.generator));
console.log(p1.is_point_on_curve(8,12))
