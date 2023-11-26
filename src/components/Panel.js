function Panel({children, className, ...rest}) {

    return (
        <div {...rest}>
            {children}
        </div>
    )
}

export default Panel;