import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(
    private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required]
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar';
      this.getProduct(this.id);
    }
  }

  getProduct(id: number) {
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product) => {
      console.log(data);
      this.loading = false;
      this.form.patchValue({
        name: data.name,
        description: data.description
      });
    });
  }

  createProduct() {
    if (this.form.valid) {
      const product: Product = {
        name: this.form.value.name,
        description: this.form.value.description
      };
      this.loading = true;
      if (this.id !== 0) {
        // Editar
        product.id = this.id;
        this._productService.updateProduct(this.id, product).subscribe(() => {
          this.toastr.info(`El producto ${product.name} fue actualizado con éxito`, 'Producto Actualizado');
          this.loading = false;
          this.router.navigate(['/dashboard']);
        });
      } else {
        // Agregar
        this._productService.createProduct(product).subscribe(() => {
          this.toastr.success(`El producto ${product.name} fue registrado con éxito`);
          this.loading = false;
          this.router.navigate(['/dashboard']);
        });
      }
    }
  }
}