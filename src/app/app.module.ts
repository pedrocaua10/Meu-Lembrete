import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio'; 
// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LembreteEditorComponent } from './pages/lembrete-editor/lembrete-editor.component';
import { ResetSenhaComponent } from './pages/reset-senha/reset-senha.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LembreteFormComponent } from './components/lembrete-form/lembrete-form.component';
import { LembreteListComponent } from './components/lembrete-list/lembrete-list.component';
import { EdicaoSucessoComponent } from './components/edicao-sucesso/edicao-sucesso.component';
import { AppRoutingModule } from './app-routing.module';


const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    DashboardComponent,
    LembreteEditorComponent,
    ResetSenhaComponent,
    HeaderComponent,
    SidebarComponent,
    LembreteFormComponent,
    LembreteListComponent,
    EdicaoSucessoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    
    // Angular Material
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatRadioModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule // Adicionado para resolver erro do mat-radio-button
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }