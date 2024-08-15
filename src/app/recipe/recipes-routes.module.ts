import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeComponent } from './recipe.component';
import { RecipeResolverService } from './recipes-resolver.service';
import { RouterModule } from '@angular/router';

const recipesRoute = [
  {
    path: '',
    component: RecipeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolverService],
      },
    ],
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(recipesRoute)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
