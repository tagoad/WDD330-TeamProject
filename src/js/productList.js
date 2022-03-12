export default class ProductList {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init(){
        const list = await this.dataSource.getData();
        this.renderList(list.filter((product) => product.transactable));
    }
    renderList(list){
        console.log("runn")
        const template = document.getElementById('product-card-template'); 
        console.log(template)
        list.forEach(product => {
            const clone = template.content.firstElementChild.cloneNode(true);
            this.listElement.appendChild(clone);
            const hydratedTemplate = this.prepareTemplate(clone, product);
            this.listElement.appendChild(hydratedTemplate);
        })
    }
    prepareTemplate(template, product){
        template.querySelector('a').href += product.Id;
        var im = template.querySelector("img")
        im.src = product.Image;
        im.alt = product.Name;

        var br = template.querySelector(".card__brand")
        br.innerHTML = product.Brand.Name;

        var na = template.querySelector(".card__name")
        na.innerHTML = product.Name;

        var pr = template.querySelector(".product-card__price")
        pr.innerHTML = product.ListPrice;

        return template;


    }
}