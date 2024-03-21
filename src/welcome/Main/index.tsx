import { ui, Feature } from 'vx-front'

export default function Main() {
    return (
        <ui.Frame gap={64}>
            <h1>Welcome to Vixen Shell</h1>
            <Feature.Link route="about">About</Feature.Link>
        </ui.Frame>
    )
}
