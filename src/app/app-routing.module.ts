import { PostsComponent } from './components/posts/posts.component';
import { UserComponent } from './components/user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { PostDetalheComponent } from './components/posts/post-detalhe/post-detalhe.component';
import { PostListaComponent } from './components/posts/post-lista/post-lista.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'user', redirectTo: 'user/perfil' },
      {
        path: 'user/perfil',
        component: PerfilComponent,
      },
      { path: 'posts', redirectTo: 'posts/lista' },
      {
        path: 'posts',
        component: PostsComponent,
        children: [
          { path: 'post/:id', component: PostDetalheComponent },
          { path: 'detalhe', component: PostDetalheComponent },
          { path: 'lista', component: PostListaComponent },
        ],
      },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ],
  },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
