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
			component: () => import('../view/capitalFeatures(4).vue')
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
		},{
			path: '/10',
			component: () => import('../view/10.vue')
		},
		,{
			path: '/gjy',
			component: () => import('../view/taskInfo.vue')
		},
		{
			path: '/',
			redirect: '/1'
		}
	]
})

export default router
