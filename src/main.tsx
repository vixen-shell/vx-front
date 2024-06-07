import { Root } from 'vx-front'

Root.create(document.getElementById('root')!).render(
    (feature) => import(`./features/${feature}/index.tsx`)
)
