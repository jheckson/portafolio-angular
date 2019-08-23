import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  productosIdx: Producto[] = [];
  productosFiltrados: Producto[] = [];
  cargando = true;

  constructor( private http: HttpClient ) {
      this.cargarProductosIdx();
  }

  private cargarProductosIdx()
  {
        return new Promise( (resolve, reject) => {

            this.http.get('https://angular-html-32d61.firebaseio.com/productos_idx.json')
            .subscribe( (productosIdx: Producto[]) => {
                this.productosIdx = productosIdx;

                setTimeout(() => {
                    this.cargando = false;
                    resolve();
                }, 500);

        } );

    });
  }

  public getProducto(id: string)
  {
      return this.http.get(`https://angular-html-32d61.firebaseio.com/productos/${ id }.json`);
  }

  public buscarProducto( termino: string)
  {
      if (this.productosIdx.length === 0)
      {
          //Cargar productos
          this.cargarProductosIdx().then( () => {
              this.filtrarProductos(termino);
          })
      }
      else
      {
         this.filtrarProductos(termino);
      }
  }


  private filtrarProductos( termino: string)
  {
      this.productosFiltrados = [];
      termino = termino.toLowerCase();

          this.productosIdx.forEach( prod => {

        const tituloLower = prod.titulo.toLocaleLowerCase();

          if( 
              prod.categoria.indexOf(termino) >= 0 ||
              tituloLower.indexOf(termino) >= 0
            ) {
              this.productosFiltrados.push( prod );
          }
      });
  }


}
