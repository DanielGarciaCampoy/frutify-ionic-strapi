import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SignupComponent } from '../signup/signup.component';
import { UserService } from 'src/app/core/services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  language = 0; // 0 español, 1 ingles
  form:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private modalCtrl:ModalController,
    private user:UserService,
    private router:Router,
    private translate: TranslateService
  ) { 
    this.form = this.formBuilder.group({
      identifier:["", [Validators.required, Validators.email]],
      password:["", Validators.required]
    });
  }

  // Cambiar idioma
  onLanguage() {
    this.language = (this.language+1)%2;
    switch(this.language) {
      case 0:
        this.translate.setDefaultLang('es');
        break;
      case 1:
        this.translate.setDefaultLang('en');
        break;
    }
  }

  ngOnInit() {}

  async register(){
    const modal = await this.modalCtrl.create({
      component:SignupComponent,
      cssClass:"modal-full-right-side"
    });

    modal.onDidDismiss().then(async(response)=>{
      try {
        if(response.role=='ok'){
          await this.user.register(response.data);
          this.router.navigate(['folder/Home'], {replaceUrl:true});
        }
        
      } catch (error) {
        console.log(error);
  
      }
    });
    modal.present();
  }

  async onSignIn(){
    try {
      await this.user.login(this.form.value);
      this.router.navigate(['folder/Home'], {replaceUrl:true});
    } catch (error) {
      console.log(error);
      // correo o contrasenia incorrecta
      document.getElementById('incorrecta').style.display = 'block'
    }
    
  }

  hasFormError(error){
    return this.form?.errors && Object.keys(this.form.errors).filter(e=>e==error).length==1;
  }
  
  errorsToArray(errors){
   
    if(errors && !('required' in errors))
      return [Object.keys(errors)[0]];
    else
      return [];
  }

  // Boton ayuda
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
