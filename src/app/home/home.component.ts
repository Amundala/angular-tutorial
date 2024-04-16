import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private produductService: ProductsService) {}

  //=== create products array ===
  products: Product[] = [];

  totalRecords: number = 0;
  rows: number = 5;

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
      .subscribe((products: Products) => {
        this.products = products.items;
        this.totalRecords = products.total;
      });
  }
  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
