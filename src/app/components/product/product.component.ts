import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  viewChild,
} from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonModule, ConfirmPopupModule],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(private confirmationServie: ConfirmationService) {}
  @ViewChild('deleteButton') deleteButton: any;

  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  //=== Delete product ===
  confirmDelete() {
    this.confirmationServie.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure?',
      accept: () => {
        this.deleteProduct();
      },
    });
  }
  editProduct() {
    this.edit.emit(this.product);
  }
  deleteProduct() {
    this.delete.emit(this.product);
  }
  ngOnInit() {}
}
