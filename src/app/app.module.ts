import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Router, RouterModule} from '@angular/router';
import {appRoutes} from './app.routers';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {HeaderComponent} from './component/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";
import { HomeComponent } from './component/home/home.component';
import { PostTileComponent } from './component/shared/post-tile/post-tile.component';
import { SideBarComponent } from './component/shared/side-bar/side-bar.component';
import { SubredditSideBarComponent } from './component/shared/subreddit-side-bar/subreddit-side-bar.component';
import { VoteButtonComponent } from './component/shared/vote-button/vote-button.component';
import { CreateSubredditComponent } from './component/subreddit/create-subreddit/create-subreddit.component';
import { ListSubredditComponent } from './component/subreddit/list-subreddit/list-subreddit.component';
import { CreatePostComponent } from './component/post/create-post/create-post.component';
import { ViewPostComponent } from './component/post/view-post/view-post.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {TokenInterceptor} from './token-interceptor';
import { ViewSubredditComponent } from './component/subreddit/view-subreddit/view-subreddit.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    PostTileComponent,
    SideBarComponent,
    SubredditSideBarComponent,
    VoteButtonComponent,
    CreateSubredditComponent,
    ListSubredditComponent,
    CreatePostComponent,
    ViewPostComponent,
    UserProfileComponent,
    ViewSubredditComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FontAwesomeModule,


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
