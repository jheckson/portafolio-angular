import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductosService } from '../../services/productos.service';

import { ProductoFull } from '../../interfaces/producto-full.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  producto: ProductoFull;
  productoId: string;

  constructor( private route: ActivatedRoute, public productoSerive: ProductosService ) { }

  ngOnInit() {

      this.route.params
            .subscribe(parametros => {
              console.log(parametros['id']);
              this.productoSerive.getProducto(parametros['id'])
                  .subscribe( (producto: ProductoFull) => {
                      this.producto = producto;
                      this.productoId = parametros['id'];
                  });
          })
  }

}
