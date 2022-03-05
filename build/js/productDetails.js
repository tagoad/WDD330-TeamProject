var o=(a,t,i)=>new Promise((s,r)=>{var l=d=>{try{c(i.next(d))}catch(e){r(e)}},n=d=>{try{c(i.throw(d))}catch(e){r(e)}},c=d=>d.done?s(d.value):Promise.resolve(d.value).then(l,n);c((i=i.apply(a,t)).next())});import{getLocalStorage as u,setLocalStorage as p}from"./utils.js";export default class h{constructor(t,i){this.productId=t,this.dataSource=i,this.product={}}init(){return o(this,null,function*(){this.product=yield this.dataSource.findProductById(this.productId),yield this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))})}addToCart(){if(u("so-cart")){const t=u("so-cart"),i=t.items.findIndex(s=>s.item.Id===this.product.Id);i===-1?t.items.push({item:this.product,qty:1,finalPrice:this.product.ListPrice}):(t.items[i].qty++,t.items[i].finalPrice=t.items[i].qty*t.items[i].item.ListPrice),t.total=t.items.reduce((s,r)=>s+r.finalPrice,0),p("so-cart",t)}else{const t={items:[{item:this.product,finalPrice:this.product.ListPrice,qty:1}],total:this.product.ListPrice};p("so-cart",t)}}renderProductDetails(){return o(this,null,function*(){const t=`
            <h3 >${this.product.Brand.Id}</h3>
            <h2 class="divider">${this.product.NameWithoutBrand}</h2>
            <img
            class="divider"
            src="${this.product.Image}"
            alt="${this.product.NameWithoutBrand}"
            />

            <p class="product-card__price">$${this.product.ListPrice}</p>
            <p class="product__color">${this.product.Colors[0].ColorName}</p>
            <p class="product__description">
                ${this.product.DescriptionHtmlSimple}
            </p>
            <div class="product-detail__add">
            <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
            </div>
        `;document.getElementById("product-details").innerHTML=t})}}
