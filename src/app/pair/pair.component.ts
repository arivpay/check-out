import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import {from} from 'rxjs';

@Component({
  selector: 'app-pair',
  templateUrl: './pair.component.html',
  styleUrls: ['./pair.component.css']
})
export class PairComponent implements OnInit {

  pairingForm: any;
  base_URL: any;
  
  constructor(
  private _route: ActivatedRoute,
  private router: Router, 
  private http: HttpClient,
  private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
	  this.createForm();
  }
  
  createForm() {
	this.pairingForm = this.formBuilder.group({
      ip_address: ['', Validators.required],
      serial_number: ['', Validators.required],
	  pairing_code: ['', Validators.required],
    });
	  
  }

 pairTerminal() {
	  console.log(this.pairingForm.value);
	  this.base_URL = 'https://'+ this.pairingForm.value['ip_address'] + ':8080/POSitiveWebLink/1.0.0/pair?pairingCode=' + this.pairingForm.value['pairing_code'] + '&tid=' + this.pairingForm.value['serial_number'];

	  console.log(this.base_URL);
	  const headers= new HttpHeaders()
		.set('content-type', 'application/json')
		.set('Access-Control-Allow-Origin', '*');
	  console.log(headers);
	  this.http.get(this.base_URL, { 'headers': headers })
		.subscribe((response)=>{
			console.log(response);
		})
  }
  
  /*pairTerminal(): Observable<any> {
	  this.base_URL = 'https://'+ this.pairingForm.value['ip_address'] + ':8080/POSitiveWebLink/1.0.0/pair?pairingCode=' + this.pairingForm.value['pairing_code'] + '&tid=' + this.pairingForm.value['serial_number'];
	  return from(
	  fetch(
		this.base_URL,
		{	headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET', // GET, POST, PUT, DELETE
          mode: 'no-cors' // the most important option
        }
      ));
	  .subscribe((response)=>{
			console.log(response);
		})
  }*/

}
