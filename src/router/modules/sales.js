import Layout from '@/layout';
const router = [
    {
        path: '/theme',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/demo/theme'),
                name: 'Theme',
                meta: { title: 'Theme', icon: 'theme' }
            }
        ]
    },
]

export default router;