import {Component, OnInit} from '@angular/core';

import { Liga } from './Liga';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  partidos: Liga[];
  partidos2: Liga[];
  selectedLiga: Liga;
  partidoM:any = {};
  partidoN:any = {};
  equipoLocal:string;
  mostrarEncontrados: boolean = false;
  hideUpdate: boolean = false;
  hideCreate: boolean = false;
msg:string = '';
  constructor(private dataService: DataService) {}

Adder(){
  this.hideCreate = true;
  this.hideUpdate = false;
  console.log("up1: " + this.hideUpdate);
  console.log("Cr1: " + this.hideCreate);
}
  ngOnInit(): void {
    this.getPartidos();
  }
  getPartidos() {
    this.partidos = [];
    
    console.log("entrada");
    this.dataService.getPartidos().then(partidos => this.partidos = partidos);
    console.log("entrada2");
    
  }

  onSelect(cust: Liga): void {
    this.selectedLiga = cust;
  }
  
  regresaLocal(){
    console.log("equipo buscado: " + this.equipoLocal);
   this.dataService.getPartidoByEquipoLocal(this.equipoLocal).then(partidos2 => this.partidos2 = partidos2);
   console.log(this.partidos2);
    this.mostrarEncontrados = true;
    console.log("part: ");
    
  }

  onSubmit():void {
    this.regresaLocal();
  }


  deletePartido(i):void {
    var answer = confirm('Estas seguro querer eliminarlo?');
    if(answer) {
      this.dataService.delete(this.partidos[i].id.toString()).then();
      this.partidos.splice(i, 1);
      this.ngOnInit();
      this.msg = 'campo eliminado';
    }
  }

  myValue;
  editPartido(i):void {
    console.log("Editantdo: " + this.partidos[i].equipoLocal + " - " + this.partidos[i].equipoVisitante);
    this.hideUpdate = true;
    this.hideCreate = false;
    this.partidoM.id = this.partidos[i].id;
    this.partidoM.equipoLocal = this.partidos[i].equipoLocal;
    this.partidoM.equipoVisitante = this.partidos[i].equipoVisitante;
    this.partidoM.golesLocal = this.partidos[i].golesLocal;
    this.partidoM.golesVisitante = this.partidos[i].golesVisitante;
    this.partidoM.fecha = this.partidos[i].fecha;
    this.myValue = i;
    console.log("up0: " + this.hideUpdate);
    console.log("Cr0: " + this.hideCreate);
  }
  

  create():void {
    console.log("Creando");
    this.hideCreate = false;
    this.hideUpdate = false;
    this.dataService.create(this.partidoN);

    this.partidos.push(this.partidoN);
    this.msg = 'campo agregado';
    //Recarga toda la pantalla
    //window.location.replace('');
    //this.ngOnInit();
    console.log("Creando2");
    console.log("up2: " + this.hideUpdate);
    console.log("Cr2: " + this.hideCreate);
  }


  updatePartido():void {
    this.hideCreate = false;
    this.hideUpdate = false;

    let i = this.myValue;
    for(let j = 0; j < this.partidos.length; j++){
      if(i == j) {
        console.log("this.myValue: " + this.myValue);
        this.dataService.update(this.partidoM);
        this.partidos[i] = this.partidoM;
        this.msg = 'campo actualizado';
        //this.partidoM = {};
      }
    }
    //window.location.replace('');
    this.ngOnInit();
    console.log("up3: " + this.hideUpdate);
    console.log("Cr3: " + this.hideCreate);
  }


}
