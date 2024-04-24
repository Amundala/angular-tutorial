import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private produductService: ProductsService) {}
  @ViewChild('paginator') paginator: Paginator | undefined;
  //=== create products array ===
  products: Product[] = [];

  totalRecords: number = 0;
  rows: number = 5;

  selectedProduct: Product = {
    name: ' ',
    image: '',
    price: '',
    id: 0,
    rating: 0,
  };
  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  //=== toggle fx ===
  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }
  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }
    this.deleteProduct(product.id);
  }
  toggleAddPopup() {
    this.displayAddPopup = true;
  }
  //=== Confirm Edit Modal ===
  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return;
    }
    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  //=== Dynamic Paginator ===
  resetPagintor() {
    this.paginator?.changePage(0);
  }

  //=== Confirm Add Modal ===
  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onProductOutput(product: Product) {
    console.log(product, 'fsdfghjs  jhjdfg');
  }

  //=== On Pgae Change Function ===
  onPageChange(event: any) {
    this.fetchProducts(event.page, event.row);
  }

  //=== Fetch products function ===
  fetchProducts(page: number, perPage: number) {
    this.produductService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (products: Products) => {
          this.products = products.items;
          this.totalRecords = products.total;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  //=== Edit Products f(x) ===
  editProduct(product: Product, id: number) {
    this.produductService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data, 'THE DATABABA');
          this.fetchProducts(0, this.rows);
          this.resetPagintor();
        },
        error: (err) => console.log(err),
      });
  }
  //=== Delete Products f(x) ===
  deleteProduct(id: number) {
    this.produductService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (res) => {
          console.log(res, 'IS IT DELETED OUBIEN');
          this.fetchProducts(0, this.rows);
          this.resetPagintor();
        },
        error: (err) => {
          console.log(err, 'ERREUR MON CHER ERRUER');
        },
      });
  }
  //=== Add Products f(x) ===
  addProduct(product: Product) {
    this.produductService
      .addProduct(`http://localhost:3000/clothes`, product)
      .subscribe({
        next: (data) => {
          console.log('Holla Mamita');
          this.fetchProducts(0, this.rows);
          this.resetPagintor();
        },
        error: (err) => {
          console.log(err, 'HABAYE IKI');
        },
      });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
