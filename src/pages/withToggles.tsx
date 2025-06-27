import { ComponentType, useState } from "react"
type WithTogglesProps<T> = {
    title: string;
    items: T[];
};
const withToggles = <T, P extends WithTogglesProps<T>>(WrappedComponent: ComponentType<P>) => {
    return function List(props: P) {
        const { items, title } = props
        const [isOpen, setIsOpen] = useState(false);
        const [isCollapsed, setIsCollapsed] = useState(false);
        const displayItems = isCollapsed ? items.slice(0, 3) : items
        function toggleOpen() {
            setIsOpen((isOpen) => !isOpen);
            setIsCollapsed(false);
        }
        return <div className="list-container">
            <div className="heading">
                <h2>{title}</h2>
                <button onClick={toggleOpen}>
                    {isOpen ? <span>&or;</span> : <span>&and;</span>}
                </button>
            </div>
            {isOpen && <WrappedComponent {...props} items={displayItems} />}
            <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
                {isCollapsed ? `Show all ${items.length}` : "Show less"}
            </button>
        </div>
    }
}

export default withToggles
