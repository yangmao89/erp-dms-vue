import Layout from '@/layout';
const router = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/demo/documentation'),
                name: 'Documentation',
                meta: {title: 'Documentation', icon: 'documentation', affix: true}
            }
        ]
    }
]

export  default router;