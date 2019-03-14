import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, Supplier } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { DataService, Product } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products$: Observable<Product[]>;

  public categories: Category[] = [];
  public suppliers: Supplier[] = [];

  public formGroup: FormGroup = this.formBuilder.group({
    name: ['', Validators.compose([Validators.required, Validators.pattern(/\w+/)])],
    price: ['', Validators.compose([Validators.required, Validators.pattern(/\d+/)])],
    category: ['', Validators.required],
    supplier: ['', Validators.required],
  });

  constructor(
    private api: DataService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.products$ = this.api.getProducts();

    this.products$.subscribe((products: Product[]) => {
      this.categories = products
        .map(product => product.category)
        .filter((category, index, arr) => arr.findIndex(cat => cat.id === category.id) === index);

      this.formGroup.get('category').setValue(this.categories[0].id);

      this.suppliers = products
        .map(product => product.supplier)
        .filter((supplier, index, arr) => arr.findIndex(supp => supp.id === supplier.id) === index);

      this.formGroup.get('supplier').setValue(this.suppliers[0].id);
    });
  }

  public addProduct() {
    console.log("add product");
    this.api.addProduct({
      name: this.formGroup.get('name').value,
      price: this.formGroup.get('price').value,
      categoryId: this.formGroup.get('category').value,
      supplierId: this.formGroup.get('supplier').value
    }).subscribe(data => {
      this.products$ = this.api.getProducts();
    });
  }

}
