export type CollisionResult={v1:number;v2:number};
export const momentum=(mass:number,velocity:number)=>mass*velocity;
export const impulse=(force:number,duration:number)=>force*duration;
export const elasticCollision1D=(m1:number,u1:number,m2:number,u2:number):CollisionResult=>{const d=m1+m2;if(d<=0)return{v1:0,v2:0};return{v1:((m1-m2)*u1+2*m2*u2)/d,v2:(2*m1*u1+(m2-m1)*u2)/d};};
export const inelasticCollision1D=(m1:number,u1:number,m2:number,u2:number):CollisionResult=>{const d=m1+m2;const v=d>0?(m1*u1+m2*u2)/d:0;return{v1:v,v2:v};};
export const round=(v:number,p=2)=>{const f=10**p;const r=Math.round((v+Number.EPSILON)*f)/f;return Object.is(r,-0)?0:r;};
