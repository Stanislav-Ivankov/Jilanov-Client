import { RouterModule, Routes } from '@angular/router';



const ApplicationRoutes: Routes = [
	{
		path: '',
		loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
	},
	{
		path: 'cart',
		loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule)
	},
	{
		path: 'category/:categoryId',
		loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule)
	},
	{
		path: 'category/:categoryId:/product/:productId',
		loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
	},
	{
		path: 'contacts',
		loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsModule)
	},
	{
		path: 'content-policy',
		loadChildren: () => import('./pages/content-policy/content-policy.module').then(m => m.ContentPolicyModule)
	},
	{
		path: 'log-in',
		loadChildren: () => import('./pages/log-in/log-in.module').then(m => m.LoginModule)
	},
	{
		path: 'maintenance',
		loadChildren: () => import('./pages/maintenance-page/maintenance-page.module').then(m => m.MaintenancePageModule)
	},
	{
		path: 'orders',
		loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule)
	},
	{
		path: '**',
		loadChildren: () => import('./pages/error-page/error-page.module').then(m => m.ErrorPageModule)
	}
];



export const ApplicationRouter = RouterModule.forRoot(ApplicationRoutes, { scrollPositionRestoration: 'top' });