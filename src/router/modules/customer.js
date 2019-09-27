import Layout from '@/layout';
const router = [
    {
        path: '/guide',
        component: Layout,
        redirect: '/guide/index',
        affix: true,
        children: [
            {
                path: 'index',
                component: () => import('@/views/demo/guide'),
                name: 'Guide',
                meta: { title: 'Guide', icon: 'guide', noCache: true }
            }
        ]
    }
]

export default router;