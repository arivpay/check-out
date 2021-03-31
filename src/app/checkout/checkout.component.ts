import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public token: any;
  public serial_number: any; public unique_id: any;
  public base_URL: any;
  public checkout_URL: any;
  public sub_URL: any;
  checkoutForm: any;
  
  constructor(private _route: ActivatedRoute,
  private router: Router, 
  private http: HttpClient,
  private formBuilder: FormBuilder,
  private toastr: ToastrService) { }

  ngOnInit() {
	  this.token = localStorage.getItem('token');
	  this.serial_number = localStorage.getItem('terminal_id');
	  this.base_URL = localStorage.getItem('base_URL');
	  this.createForm();
  }
  
  createForm() {
	this.checkoutForm = this.formBuilder.group({
      amount: ['', Validators.required],
    });
	  
  }
  
  transaction() {
	this.sub_URL = '/transaction';
	this.checkout_URL = this.base_URL+this.sub_URL+'?tid='+this.serial_number+'&silent=false';
	
	const headers= new HttpHeaders()
		.set('Authorization', this.token)
		.set('content-type', 'application/json')
		
	const data = JSON.stringify({
		"transType":"SALE",
		"amountTrans":this.checkoutForm.value['amount'],
		"amountGratuity":0,
		"amountCashback":0,
		"reference":"TEST CARD",
		"language":"en_GB"
	});
	this.http.post(this.checkout_URL, data, { 'headers': headers }).subscribe((response)=>{
				this.toastr.success("Check Out Successful", '');
				//console.log(response);
				localStorage.setItem('unique_id' , Object.values(response)[4]);
				this.transactionStatus();
			},
			err => {
				this.toastr.error("Transaction Failed", '');
			}
		)
  }
  
  transactionStatus() {
	this.unique_id = localStorage.setItem('unique_id');
	this.sub_URL = '/transaction';
	this.checkout_URL = this.base_URL+this.sub_URL+'?uti='+this.unique_id+'&tid='+this.serial_number;
	
	const headers= new HttpHeaders()
		.set('Authorization', this.token)
		.set('content-type', 'application/json')
	
	this.http.get(this.checkout_URL, { 'headers': headers }).subscribe((response)=>{
		console.log(response);
	},
	err => {
		this.toastr.error("Error in Fetching Transaction Status", '');
	}
	)
}
