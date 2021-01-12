import {Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {HomeComponent} from './component/home/home.component';
import {AuthGuard} from './guard/auth.guard';
import {CreateSubredditComponent} from './component/subreddit/create-subreddit/create-subreddit.component';
import {ListSubredditComponent} from './component/subreddit/list-subreddit/list-subreddit.component';
import {ViewPostComponent} from './component/post/view-post/view-post.component';
import {UserProfileComponent} from './component/user-profile/user-profile.component';
import {CreatePostComponent} from './component/post/create-post/create-post.component';


export const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'create-subreddit', component: CreateSubredditComponent,canActivate:[AuthGuard]},
  {path: 'list-subreddit', component: ListSubredditComponent},
  {path: 'view-post/:id', component: ViewPostComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'create-post', component: CreatePostComponent,canActivate:[AuthGuard]},

];
