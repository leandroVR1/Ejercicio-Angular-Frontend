import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listProduct: Product[] = []
  loading: boolean = false

  constructor(
    private toastr: ToastrService,
    private _productService : ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.loading = true;
    this._productService.getProducts().subscribe((data: Product[]) => {
      this.listProduct = data;
      this.loading = false;
    })
  }

  /*addProduct() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe(() => {
        this.getProducts();
        this.productForm.reset();
      });
    }
  }*/

    deleteProduct(id: number){
      this.loading = true;
      this._productService.deleteProduct(id).subscribe(() =>{
        this.loading = false;
        this.getProducts();
        this.toastr.warning('El producto fue eliminado con exito' , 'Producto Eliminado')


        
        
      })

    

    }
}
