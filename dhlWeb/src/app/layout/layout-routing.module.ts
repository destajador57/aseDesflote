import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '',                         redirectTo: 'control/empresa' },
            { path: 'dash',                     loadChildren: './dash/dash.module#DashModule' },
            { path: 'dashboard',                loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts',                   loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables',                   loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms',                    loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element',               loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid',                     loadChildren: './grid/grid.module#GridModule' },
            { path: 'components',               loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'promociones',              loadChildren: '../promociones/promociones.module#PromocionesModule' },
            { path: 'usuarios',                 loadChildren: '../usuarios/usuarios.module#UsuariosModule' },
            { path: 'miperfil',                 loadChildren: '../perfilusuario/perfilusuario.module#PerfilusuarioModule' },
            { path: 'blank-page',               loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
