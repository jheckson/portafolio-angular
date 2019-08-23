import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InfoPaginaService } from '../../services/info-pagina.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( public infoServicio: InfoPaginaService,
          private router: Router
          ) { }

    public buscarProducto( termino: string)
    {
        if( termino.length < 1)
        {
            return;
        }
        else {
            this.router.navigate(['/search', termino]);
        }
    }


  ngOnInit() {
  }

}
