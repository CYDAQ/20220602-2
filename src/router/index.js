import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/view/login.vue'
import IdnexView from '@/view/index.vue'
import NotesView from "@/view/Notes.vue"
import ModelView from "@/view/Model.vue"
import PlanView from "@/view/Plan.vue"
import DetailedView from "@/view/Detailed.vue"
import CollectionView from "@/view/Collection.vue"
import AddView from "@/view/PlanAdd.vue"
import SettingsView from "@/view/Settings.vue"
import IndividualView from "@/view/Individual.vue"
import SetView from "@/view/Set.vue"
import ModifyView from "@/view/Modify.vue"
import MorePlans from "@/view/MorePlans.vue"
import List from "@/view/List.vue"
const routes = [
    {
        path: '/login',
        name: '登录页',
        component: LoginView
    },
    {
        path: '/index',
        name: 'index',
        component: IdnexView
    },
    { path: '/', redirect: '/index' },
    {
        path: '/Notes',
        name: 'Notes',
        component: NotesView
    },
    {
        path: '/Model/:id',
        name: 'Model',
        component: ModelView
    },
    {
        path: '/Plan/:id',
        name: 'Plan',
        component: PlanView
    },
    {
        path: '/Detailed',
        name: 'Detailed',
        component: DetailedView
    },
    {
        path: '/PlanAdd',
        name: 'PlanAdd',
        component: AddView
    },
    {
        path: '/Collection',
        name: 'Collection',
        component: CollectionView
    },
    {
        path: '/Settings',
        name: 'Settings',
        component: SettingsView
    },
    {
        path: '/Set',
        name: 'Set',
        component: SetView
    },
    {
        path: '/Individual',
        name: 'Individual',
        component: IndividualView
    },
    {
        path: '/Modify',
        name: 'Modify',
        component: ModifyView
    },
    {
        path: '/MorePlans',
        name: 'MorePlans',
        component: MorePlans
    },
    {
        path: '/List',
        name: 'List',
        component: List
    },
]
const whiteList = ['/login', '/index', '/Individual']
let router = createRouter({
    routes,
    history: createWebHistory(),
})
router.beforeEach((to, from, next) => {
    whiteList.forEach(function (item) {
        if (item.indexOf(to.path) !== -1) {
            next()
            return
        } else {
            console.log(to.path);
        }
    });
    let token = localStorage.getItem('User_Token')
    if (token) {
        next()
    } else {
        next({ path: '/login' })
    }
})
export default router;