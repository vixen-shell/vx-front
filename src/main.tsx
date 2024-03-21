import { Root } from 'vx-front'

Root.create(document.getElementById('root')!).render(
    (feature) => import(`./${feature}/index.tsx`)
)
