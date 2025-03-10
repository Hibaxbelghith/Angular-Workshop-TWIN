import { Component, QueryList } from '@angular/core';
import { Category } from '../models/category';
import { shortList } from '../models/shortList';
import { ViewChildren } from '@angular/core';
import { CardComponent } from './../card/card.component';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-list-categories-component',
  templateUrl: './list-categories-component.component.html',
  styleUrls: ['./list-categories-component.component.css']
})
export class ListCategoriesComponentComponent {
  
  /*categories : Category[] = [
    {"id":1,"title":"Grand électroménager",
    "image":"assets/images/categorie_electromenager.jpg", "description":"Grand électroménager",
    "available":true, "prix":150},
    {"id":2,"title":"Petit électroménager",
    "image":"assets/images/categorie_petit_electromenager.jpg", "description":"Petit électroménager",
    "available":true,"prix":110},
    {"id":3,"title":"Produits informatiques",
    "image":"assets/images/categorie_produits_informatiques.jpg", "description":"Produits informatiques",
    "available":true,"prix":100},
    {"id":4,"title":"Smart Phones", "image":"assets/images/categorie_smartPhone.jpg",
    "description":"Smart Phones", "available":true,"prix":190},
    {"id":5,"title":"TV, images et son", "image":"assets/images/categorie_tv_image_son.jpg", "description":"TV images et son",
    "available":true,"prix":150},
    {"id":6,"title":"Produits voiture", "image":"assets/images/produits_nettoyages.jpg",
    "description":"Produits voiture","available":false,"prix":170},
    ]*/

    f(description:string){
      alert(description);
    }

    titre : string = " ";

    shortList : shortList[] = []; //stocke les catégories ajoutées à la shortlist a partir de fild card

    addToShortList(elt : shortList){
      // la méthode .some() de JavaScript pour vérifier si un élément spécifique existe déjà dans un tableau (pour le même utilisateur)
    const exists = this.shortList.some( 
      (item) => item.idElement === elt.idElement && item.idUser === elt.idUser
    );
    if (!exists) { // Si l'élément n'existe pas encore, on l'ajoute à la shortList
      this.shortList.push(elt);
      console.log('Catégorie ajoutée à la shortlist:', elt);
    } else { // Sinon, afficher un message indiquant que l'élément existe déjà
      console.log('Cette catégorie est déjà dans la shortlist pour cet utilisateur.');
    }
    }

    //Question 8 : @ViewChildren pour accéder aux composants fils 
      // Récupère toutes les instances de CardComponent dans le parent dans une liste (QueryList)
      @ViewChildren(CardComponent) cardComponents!: QueryList<CardComponent>;
      
      ngAfterViewInit(): void {
        this.cardComponents.forEach((card, index) => {
          card.btnText = `Ajouter ${this.categories[index].title} au shortlist`;
        });
  }
  
  /*
        @ViewChildren(CardComponent) children: QueryList<CardComponent>;
        ngAfterViewInit() {
          this.children.forEach(child => {
            child.btn='Voir produits';
          })}

          
*/

      //injecter le service categoryService sous le nom de cs
      constructor(private cs:CategoryService){}

      categories : Category[]= [];
        ngOnInit(){
          //appel synchrone
        //  this.categories = this.cs.getListCategories();
        this.cs.getAllCategoriesFromBackend().subscribe(
          res=>this.categories=res);
        }

        handleCategoryDeleted(categoryId: number) {
          this.categories = this.categories.filter((c) => c.id !== categoryId);
        }

}
