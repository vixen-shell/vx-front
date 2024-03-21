import { ui, Feature } from 'vx-front'

export default function About() {
    return (
        <ui.Frame gap={64}>
            <h1>About Vixen Shell</h1>
            <Feature.Link route="main">Welcome</Feature.Link>
        </ui.Frame>
    )
}
