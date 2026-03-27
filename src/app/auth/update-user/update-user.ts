import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';



@Component({
  selector: 'app-update-user',
  standalone : true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './update-user.html',
  styleUrl: './update-user.css'
})
export class UpdateUser implements OnInit {

  userId: any;


  data: any = {
    firstname: '',
    lastname: '',
    company: '',
    phonenumber: '',
    email_ids: '',
    serialNumber: ''
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cd : ChangeDetectorRef,
     private location: Location
  ) {}

  ngOnInit() {

    this.userId = this.route.snapshot.paramMap.get('id');
    this.getUserById();

  }
  getUserById() {
  this.http.get(`http://localhost:8080/api/auth/${this.userId}`)
    .subscribe((res: any) => {
      this.data = res.data[0];
      this.cd.detectChanges(); 

         this.data = {
        ...res.data[0],
        phonenumber: res.data[0].phonenumber || ''
      };
     
    });
}

    updateUser(){

    this.http.put(`http://localhost:8080/api/auth/${this.userId}`,this.data)
    .subscribe(res=>{

      alert("User Updated Successfully");

      this.router.navigate(['/table-data']);

    });

  }

  goBack() {
  this.location.back();
}

}
