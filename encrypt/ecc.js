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
}

const p1=new  elliptic_curve(13,2,0,[1,1],40);
console.log(p1.reduce_modp(4));