import { ResolvedLink } from '../store'
import { LinkWidget } from './widgets'

export const LinksLayer = ({ links }: { links: ResolvedLink[] }) => {
    return (
        <svg
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
            }}
        >
            {links.map(link => (
                <LinkWidget key={link.id} link={link} />
            ))}
        </svg>
    )
}
