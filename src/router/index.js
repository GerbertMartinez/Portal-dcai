// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useSessionData } from '@/store/SessionData';

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('@/views/Home.vue')
            }
        ]
    },
    {
        path: '/main',
        component: () => import('@/layouts/main/Main.vue'),
        children: [
            {
                path: '',
                name: 'Main',
                component: () => import('@/views/Main.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach(async (to,from) => {

    const sessionData = useSessionData();
    
    if (!localStorage.getItem('token') && to.name !== 'Home'){
        console.log('1')
        return { name: 'Home'}
    } else if (localStorage.getItem('token') && to.name == 'Home'){
        console.log('2')
        sessionData.checkConection()
        return { name: 'Main'}
    } else if (to.name == 'Main' && from.name == 'Home') {
        console.log('3')
    } else if (to.name == 'Home') {
        console.log('4')
    } else {
        console.log('5')
        sessionData.checkConection()
    }


})


export default router
