import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpResponse} from '@angular/common/http';

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
	  this.http.get(this.base_URL)
		.subscribe((response)=>{
			console.log(response);
		})
  }

}
