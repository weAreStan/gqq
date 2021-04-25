import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
	routes: [{
			path: '/1',
			component: () => import('../view/1.vue')
		}, {
			path: '/2',
			component: () => import('../view/2.vue')
		},
		{
			path: '/3',
			component: () => import('../view/capitalFeatures(2).vue')
		},
		{
			path: '/4',
			component: () => import('../view/capitalFeatures.vue')
		},
		{
			path: '/5',
			component: () => import('../view/capitalUsage.vue')
		},
		{
			path: '/6',
			component: () => import('../view/judgeRecord.vue')
		},
		{
			path: '/7',
			component: () => import('../view/capitalPivot.vue')
		},
		{
			path: '/8',
			component: () => import('../view/8.vue')
		},
		{
			path: '/9',
			component: () => import('../view/9.vue')
		},
		{
			path: '/10',
			component: () => import('../view/10.vue')
		},
		{
			path: '/11',
			component: () => import('../view/11.vue')
		},
		{
			path: '/12',
			component: () => import('../view/12.vue')
		},
		{
			path: '/13',
			component: () => import('../view/13.vue')
		},
		{
			path: '/14',
			component: () => import('../view/14.vue')
		},
		{
			path: '/15',
			component: () => import('../view/capitalBalance.vue')
		},
		{
			path: '/16',
			component: () => import('../view/16.vue')
		},
		{
			path: '/17',
			component: () => import('../view/17.vue')
		},
		{
			path: '/18',
			component: () => import('../view/18.vue')
		},
		{
			path: '/19',
			component: () => import('../view/stayOrder/index.vue')
		},
		{
			path: '/20',
			component: () => import('../view/index(5).vue')
		},
		{
			path: '/login',
			component: () => import('../view/login.vue')
		},
		{
			path: '/',
			redirect: '/1'
		}
	]
})

export default router